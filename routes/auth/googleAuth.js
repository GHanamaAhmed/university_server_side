const passport = require("passport");
const router = require("express").Router();
router.get(
  "/google",
  (req, res, next) => {
    req.session.query = req.query;
    next();
  },
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get("/google/callback", (req, res, next) => {
  passport.authenticate(
    "google",
    {
      session: true,
      keepSessionInfo: true,
    },
    function (err, user, info) {
      if (err) {
        if (`register first` == err || `"faculty" is required` == err) {
          res
            .status(404)
            .redirect(`${process.env.ADMIN_URL}/auth/register/google`);
        } else {
          res.status(404).redirect(`${process.env.ADMIN_URL}/auth/login`);
        }
        return;
      }
      if (user) {
        req.login(user, (loginErr) => {
          if (loginErr) {
            return next(loginErr);
          }
          return res.status(200).redirect(`${process.env.ADMIN_URL}`);
        });
        // res.status(200).redirect(`${process.env.ADMIN_URL}`);
      } else {
        res.status(404).redirect(`${process.env.ADMIN_URL}/auth/login`);
      }
    }
  )(req, res);
});
module.exports = router;
