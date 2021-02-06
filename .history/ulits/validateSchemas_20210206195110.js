const Joi = require("joi");
module.exports = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    city: Joi.string().required(),
    description: Joi.string().required(),
    img: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).required(),
});
