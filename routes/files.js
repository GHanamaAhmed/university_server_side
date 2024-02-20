const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuid } = require("uuid");
// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    // if (ext !== ".jpg" && ext !== ".png" && ext !== ".mp4") {
    // return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    // }
    cb(null, true);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
  try {
    return res.json({
      success: true,
      url: req.file.path,
      fileName: req.file.filename,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: err?.message });
  }
});

module.exports = router;
