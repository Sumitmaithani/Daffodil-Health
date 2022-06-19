const mongoose = require("mongoose");
const Joi = require("joi");

const childdetailSchema = new mongoose.Schema({
	childname: { type: String, required: true },
	date: { type: Date, required: true  },
	height1: { type: Number, required: true },
	height2: { type: Number, required: true },
	weight: { type: Number, required: true },
});

const Childdetail = mongoose.model("childdetail", childdetailSchema);

const validate = (data) => {
	const schema = Joi.object({
		childname: Joi.string().required().label("Childname"),
		date: Joi.string().required().label("Date"),
		height1: Joi.string().required().label("Height1"),
		height2: Joi.string().required().label("Height2"),
		weight: Joi.string().required().label("Weight"),
	});
	return schema.validate(data);
};

module.exports = { Childdetail, validate };