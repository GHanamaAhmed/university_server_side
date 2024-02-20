const google = require("passport-google-oauth20").Strategy;

const { adminValidator } = require("../lib/joi/adminSchema");
const adminModel = require("../models/adminModel");

module.exports = (passport) => {
  passport.use(
    new google(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const admin = await adminModel.findOne({ googleId: profile.id });
          if (admin) {
            return done(null, admin);
          }
          if (
            Boolean(req.session.query.login) == true &&
            !req.session.query.faculty
          ) {
            return done("register first");
          }
          const { error } = adminValidator.validate(req.session.query);
          if (error) {
            return done(error.details[0].message);
          }
          const newAdmin = new adminModel({
            googleId: profile?.id,
            name: profile?.displayName,
            email: profile.emails?.[0]?.value,
            faculty: req.session.query.faculty,
            departement: req.session.query.departement,
            photo: profile.photos?.[0]?.value,
          });
          await newAdmin.save();
          done(null, newAdmin);
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
  passport.serializeUser((admin, done) => {
    done(null, admin._id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const admin = await adminModel.findById(id);
      done(null, admin);
    } catch (error) {
      done(error);
    }
  });
};
