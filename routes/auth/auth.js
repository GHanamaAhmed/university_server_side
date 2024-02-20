const passport = require("passport");
const router = require("express").Router();
router.head("/logout", (req, res) => {
  req.logout({ keepSessionInfo: false }, (err) => {
    if (err) {
      console.error(err);
      return res.status;
    }
  });
  res.status(200).send("Logout");
});
module.exports = router;
