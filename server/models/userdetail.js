const mongoose = require("mongoose");
const Joi = require("joi");

const userdetailSchema = new mongoose.Schema({
	fullname: { type: String, required: true },
	phone: { type: String, required: true  },
	city: { type: String, required: true },
});

const Userdetail = mongoose.model("userdetail", userdetailSchema);

const validate = (data) => {
	const schema = Joi.object({
		fullname: Joi.string().required().label("Fullname"),
		phone: Joi.string().required().label("Phone"),
		city: Joi.string().required().label("City"),
	});
	return schema.validate(data);
};

module.exports = { Userdetail, validate };