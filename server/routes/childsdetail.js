const router = require("express").Router();
const { Childdetail, validate } = require("../models/childdetail");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		await new Childdetail({ ...req.body }).save();
		res.status(201).send({ message: "User Details created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;

