const {
    createProfile, getProfileByUserId, updateProfile, updateResume
} = require("../services/profileService");
const AppError = require("../middleware/AppError");

const create = async (req, res, next) => {
    try {
        const existing = await getProfileByUserId(req.user.id);
        if (existing) return next(new AppError("Profile already exists", 409));
        const profile = await createProfile(req.user.id, req.body);
        res.status(201).json({ message: "Profile created successfully", profile });
    } catch (error) { next(error); }
};

const getMyProfile = async (req, res, next) => {
    try {
        const profile = await getProfileByUserId(req.user.id);
        if (!profile) return next(new AppError("Profile not found", 404));
        res.status(200).json({ profile });
    } catch (error) { next(error); }
};

const update = async (req, res, next) => {
    try {
        const existing = await getProfileByUserId(req.user.id);
        if (!existing) return next(new AppError("Create your profile first", 404));
        const updated = await updateProfile(req.user.id, req.body);
        res.status(200).json({ message: "Profile updated successfully", profile: updated });
    } catch (error) { next(error); }
};

const getCandidateProfile = async (req, res, next) => {
    try {
        const profile = await getProfileByUserId(req.params.userId);
        if (!profile) return next(new AppError("Profile not found", 404));
        res.status(200).json({ profile });
    } catch (error) { next(error); }
};

const uploadResume = async (req, res, next) => {
    try {
        if (!req.file) return next(new AppError("Please upload a resume file", 400));
        const existing = await getProfileByUserId(req.user.id);
        if (!existing) return next(new AppError("Create your profile first", 404));

        const resumeUrl = `/uploads/resumes/${req.file.filename}`;
        const updated = await updateResume(req.user.id, resumeUrl, req.file.originalname);
        res.status(200).json({
            message: "Resume uploaded successfully",
            resumeUrl: updated.resumeUrl,
            resumeName: updated.resumeName
        });
    } catch (error) { next(error); }
};

module.exports = { create, getMyProfile, update, getCandidateProfile, uploadResume };