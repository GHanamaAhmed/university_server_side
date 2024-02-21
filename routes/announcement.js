const announcement = require("../controller/announcementController");
const { isAdmin } = require("../middlewares/auth");
const router = require("express").Router();
const multer = require("multer");
const { v4: uuid } = require("uuid");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Adjust the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.route("/admin/:id?").get(isAdmin, announcement.getByIdAdmin);
router.route("/annoncement/:id").get(announcement.getAnnouncementById);
router.route("/view/:id").get(announcement.increaseViews);
router
  .route("/:faculte?/:departement?/:speciality?/:year?")
  .post(upload.single("thumbnail"), isAdmin, announcement.postAnnouncement)
  .get(announcement.getAnnouncement)
  .delete(isAdmin, announcement.deleteAnnouncement)
  .put(isAdmin, announcement.editAnnouncement);
module.exports = router;
