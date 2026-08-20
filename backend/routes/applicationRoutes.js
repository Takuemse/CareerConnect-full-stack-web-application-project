const express = require("express");

const {
    apply,
    getMyApplications,
    getJobApplications,
    updateStatus
} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Job seeker applies for a job
router.post(
    "/jobs/:jobId",
    protect,
    allowRoles("JOB_SEEKER"),
    apply
);

// Job seeker views their applications
router.get(
    "/my",
    protect,
    allowRoles("JOB_SEEKER"),
    getMyApplications
);

// Recruiter views applications for a job
router.get(
    "/job/:jobId",
    protect,
    allowRoles("RECRUITER"),
    getJobApplications
);

// Recruiter updates application status
router.patch(
    "/:applicationId/status",
    protect,
    allowRoles("RECRUITER"),
    updateStatus
);

module.exports = router;