const admin = require("../controller/AdminController");
const { isAdmin } = require("../middlewares/auth");
const router = require("express").Router();
router.route("/").get(isAdmin, admin.fetchInfo);
module.exports=router
