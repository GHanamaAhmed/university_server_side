const {
  announcementValidator,
  editAnnouncementValidator,
} = require("../lib/joi/announcementValiditor");
const departements = require("../data/departements.json");
const announcementModel = require("../models/announcemetModel");
const { v4: uuid } = require("uuid");
const permeation = (admin, post) => {
  // if (!admin.departement && admin.faculty === post.faculty) {
  //   return true;
  // }
  // if (
  //   post.departement.includes(admin.departement) &&
  //   admin.faculty == post.faculty
  // ) {
  //   return true;
  // }
  // return false;
  return true;
};

module.exports.postAnnouncement = async (req, res) => {
  try {
    const body = req.body;
    const { error } = announcementValidator.validate(body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (!req.file) {
      return res.status(400).send("No files were uploaded.");
    }
    const sampleFile = req.file;
    const admin = req.user;
    if (permeation(admin, body) === false) {
      return res.status(400).send("Invalid permeation");
    }
    const post = await announcementModel.create({
      adminId: admin._id,
      faculte: body.faculte,
      thumbanil: sampleFile?.path,
      departement: body.departement,
      speciality: body.speciality,
      content: body.content,
      title: body.title,
      year: body.year,
    });
    await post.save();
    res.status(200).send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
module.exports.getAnnouncement = async (req, res) => {
  try {
    const { min, max, reversed } = req.query;
    const params = req.params;
    const posts = await announcementModel
      .find()
      .sort({ createdAt: reversed === "true" ? 1 : +1 })
      .skip(min)
      .limit(max);
    res.status(200).send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send;
  }
};
module.exports.getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await announcementModel.findById(id);
    if (!post) {
      return res.status(400).send("Invalid Id");
    }
    console.log(post);
    res.status(200).send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send;
  }
};
module.exports.getByIdAdmin = async (req, res) => {
  try {
    const admin = req.user;
    const { id } = req.params;
    const post = await announcementModel.find({ adminId: id || admin._id });
    res.status(200).send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
module.exports.deleteAnnouncement = async (req, res) => {
  try {
    const { ids } = req.body;
    const posts = await announcementModel.find({ _id: { $in: ids } });
    const admin = req.user;
    if (posts.find((post) => post.adminId == admin._id))
      return res.status(403).send("mothode not allowed");
    if (posts.length !== ids.length) {
      return res.status(400).send("Invalid Ids");
    }
    await announcementModel.deleteMany({ _id: { $in: ids } });
    res.status(200).send("Deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
module.exports.editAnnouncement = async (req, res) => {
  try {
    const { error } = editAnnouncementValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { id, content, title, year, speciality, faculte, departement } =
      req.body;
    const post = await announcementModel.findOne({ _id: id });
    if (!post) {
      return res.status(400).send("Invalid Id");
    }
    const admin = req.user;
    if (permeation(admin, body) === false) {
      return res.status(400).send("Invalid permeation");
    }
    post.faculte = faculte;
    post.departement = departement;
    post.speciality = speciality;
    post.content = content;
    post.title = title;
    post.year = year;
    await post.save();
    res.status(200).send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
module.exports.increaseViews = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await announcementModel.findById(id);
    if (!post) {
      return res.status(400).send("Invalid Id");
    }
    post.views += 1;
    await post.save();
    res.status(200).send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
// module.exports.getDepartements = async () => {
//   try {
//     res.status(200).send(departements);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .send("Internal server error, please try again later");
//   }
// }
