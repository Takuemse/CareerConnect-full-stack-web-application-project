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
const { profileValidation } = require("../validations/profileValidation");

const validate =
    require("../middleware/validationMiddleware");

const router = express.Router();

// Job seeker creates profile
router.post(
    "/",
    protect,
    allowRoles("JOB_SEEKER"),
    profileValidation,
    validate,
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
    profileValidation,
    validate,
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