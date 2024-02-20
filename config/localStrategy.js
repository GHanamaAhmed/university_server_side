const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const adminModel = require("../models/adminModel");
const { adminValidator } = require("../lib/joi/adminSchema");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      async function (req, email, password, done) {
        try {
          const user = await adminModel.findOne({ email });
          const sault = 10;
          const hash = bcrypt.hashSync(password, sault);
          if (!user) {
            const { error } = adminValidator.validate(req.body);
            if (error) {
              return done(null, false, error.details[0].message);
            }
            const newUser = new adminModel({
              email,
              password: hash,
              name: req.body.name,
              faculty: req.body.faculty,
              departement: req.body.departement,
            });
            await newUser.save();
            return done(null, newUser);
          }
          if (!user.password === hash) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          console.error(error);
          return done(error);
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
