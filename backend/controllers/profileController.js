const { createProfile, getProfileByUserId, getProfileById, updateProfile,} = require("../queries/profileQueries");
const { updateResume } = require("../queries/profileQueries");

const create = async (req, res) => {
    try {
        const {
            phone,
            location,
            bio,
            skills
        } = req.body;

        const existingProfile =
            await getProfileByUserId(req.user.id);

        if (existingProfile) {
            return res.status(409).json({
                message: "Profile already exists"
            });
        }

        const profile = await createProfile(
            req.user.id,
            phone,
            location,
            bio,
            skills
        );

        res.status(201).json({
            message: "Profile created successfully",
            profile
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const getMyProfile = async (req, res) => {
    try {
        const profile =
            await getProfileByUserId(req.user.id);

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.status(200).json({
            profile
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const update = async (req, res) => {
    try {
        const {
            phone,
            location,
            bio,
            skills
        } = req.body;

        const profile =
            await getProfileByUserId(req.user.id);

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        const updatedProfile =
            await updateProfile(
                req.user.id,
                phone,
                location,
                bio,
                skills
            );

        res.status(200).json({
            message: "Profile updated successfully",
            profile: updatedProfile
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getCandidateProfile = async (req, res) => {
    try {
        const profile =
            await getProfileById(req.params.id);

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.status(200).json({
            profile
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const uploadResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a resume"
            });
        }

        const profile =
            await getProfileByUserId(req.user.id);

        if (!profile) {
            return res.status(404).json({
                message: "Create your profile first"
            });
        }

        const updatedProfile =
            await updateResume(
                req.user.id,
                req.file.filename
            );

        res.status(200).json({
            message: "Resume uploaded successfully",
            resume: updatedProfile.resume
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    create,
    getMyProfile,
    update,
    getCandidateProfile,
    uploadResume
    
    
};