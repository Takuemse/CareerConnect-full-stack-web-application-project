const express = require("express");

const {
    create,
    getMyProfile,
    update,
    getCandidateProfile,
    uploadResume
} = require("../controllers/profileController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Job seeker creates profile
router.post(
    "/",
    protect,
    allowRoles("JOB_SEEKER"),
    create
);

// Job seeker gets own profile
router.get(
    "/me",
    protect,
    allowRoles("JOB_SEEKER"),
    getMyProfile
);

// Job seeker updates own profile
router.put(
    "/",
    protect,
    allowRoles("JOB_SEEKER"),
    update
);

// Recruiter views candidate profile
router.get(
    "/candidate/:id",
    protect,
    allowRoles("RECRUITER"),
    getCandidateProfile
);

// Job seeker uploads resume
router.post(
    "/resume",
    protect,
    allowRoles("JOB_SEEKER"),
    upload.single("resume"),
    uploadResume
);

module.exports = router;