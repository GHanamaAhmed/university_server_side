const Joi = require("joi");
const announcementValidator = Joi.object({
  title: Joi.string().required(),
  faculte: Joi.string().required(),
  thumbnail: Joi.any(),
  departement: Joi.array().items(Joi.string()),
  speciality: Joi.array().items(Joi.string()),
  year: Joi.array().items(
    Joi.string().valid(
      "1 licenc",
      "2 licenc",
      "3 licenc",
      "1 master",
      "2 master",
      "1 doctora",
      "2 doctora"
    )
  ),
  content: Joi.string().required(),
});
const editAnnouncementValidator = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  faculte: Joi.string().required(),
  departement: Joi.array().items(Joi.string()),
  speciality: Joi.array().items(Joi.string()),
  year: Joi.array().items(
    Joi.string().valid(
      "1 licenc",
      "2 licenc",
      "3 licenc",
      "1 master",
      "2 master",
      "1 doctora",
      "2 doctora"
    )
  ),
  content: Joi.string().required(),
});
module.exports = { announcementValidator, editAnnouncementValidator };
