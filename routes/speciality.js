const router = require("express").Router();
const speciality = require("../data/speciality.json");
const faculte = require("../data/faculte.json");
const departements = require("../data/departements.json");
const years = require("../data/years.json");
router.route("/").get((req, res) => {
  res.status(200).send({ faculte, departements, speciality, years });
});
module.exports = router;
