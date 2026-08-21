const express = require("express");
const { create, getMyProfile, update, getCandidateProfile, uploadResume } = require("../controllers/profileController");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { profileValidation } = require("../validations/profileValidation");
const validate = require("../middleware/validationMiddleware");

const router = express.Router();

router.post("/", protect, allowRoles("JOB_SEEKER"), profileValidation, validate, create);
router.get("/me", protect, allowRoles("JOB_SEEKER"), getMyProfile);
router.put("/", protect, allowRoles("JOB_SEEKER"), profileValidation, validate, update);
router.post("/resume", protect, allowRoles("JOB_SEEKER"), upload.single("resume"), uploadResume);
router.get("/candidate/:userId", protect, allowRoles("RECRUITER"), getCandidateProfile);

module.exports = router;