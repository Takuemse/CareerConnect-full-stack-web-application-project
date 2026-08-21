const express = require("express");
const { createJobValidation, updateJobValidation } = require("../validations/jobValidation");
const { jobSearchValidation } = require("../validations/jobSearchValidation");
const validate = require("../middleware/validationMiddleware");
const { create, getAll, getOne, getMine, update, remove } = require("../controllers/jobController");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, allowRoles("RECRUITER"), createJobValidation, validate, create);
router.get("/", jobSearchValidation, validate, getAll);
router.get("/recruiter/mine", protect, allowRoles("RECRUITER"), getMine);
router.get("/:id", getOne);
router.put("/:id", protect, allowRoles("RECRUITER"), updateJobValidation, validate, update);
router.delete("/:id", protect, allowRoles("RECRUITER"), remove);

module.exports = router;