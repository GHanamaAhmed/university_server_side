const passport = require("passport");
const router = require("express").Router();
router.post("/local", (req, res) => {
  passport.authenticate(
    "local",
    {
      session: true,
      keepSessionInfo: true,
    },
    function (err, user, info) {
      if (err) {
        res.status(404).json(err);
        return;
      }
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401).json(info);
      }
    }
  )(req, res);
});
module.exports = router;
