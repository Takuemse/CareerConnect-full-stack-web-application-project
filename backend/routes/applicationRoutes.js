const express = require("express");
const { applicationValidation, applicationStatusValidation } = require("../validations/applicationValidation");
const validate = require("../middleware/validationMiddleware");
const { apply, getMyApplications, getJobApplications, updateStatus } = require("../controllers/applicationController");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/jobs/:jobId", protect, allowRoles("JOB_SEEKER"), applicationValidation, validate, apply);
router.get("/my", protect, allowRoles("JOB_SEEKER"), getMyApplications);
router.get("/job/:jobId", protect, allowRoles("RECRUITER"), getJobApplications);
router.patch("/:applicationId/status", protect, allowRoles("RECRUITER"), applicationStatusValidation, validate, updateStatus);

module.exports = router;