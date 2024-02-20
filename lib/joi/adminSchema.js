const Joi = require("joi");

const adminValidator = Joi.object({
  google: Joi.boolean().optional(),
  departement: Joi.string().optional(),
  faculty: Joi.string().required(),
  email: Joi.string().email().when("google", {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  name: Joi.string().when("google", {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  password: Joi.string().when("google", {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
});

module.exports = { adminValidator };
