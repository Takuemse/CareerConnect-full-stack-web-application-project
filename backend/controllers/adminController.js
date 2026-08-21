const {
    getAllUsers, setUserBanStatus, deleteUser,
    getAllCompaniesWithRecruiter, deleteCompany,
    getAllJobsWithCompany, deleteJob,
    getAllApplications, getStats
} = require("../services/adminService");
const AppError = require("../middleware/AppError");

const stats = async (req, res, next) => {
    try {
        res.status(200).json({ stats: await getStats() });
    } catch (error) { next(error); }
};

const listUsers = async (req, res, next) => {
    try {
        const { role, keyword } = req.query;
        const users = await getAllUsers({ role, keyword });
        res.status(200).json({ users });
    } catch (error) { next(error); }
};

const banUser = async (req, res, next) => {
    try {
        const { isBanned } = req.body;
        const user = await setUserBanStatus(req.params.id, isBanned !== false);
        res.status(200).json({
            message: user.isBanned ? "User banned" : "User unbanned",
            user
        });
    } catch (error) { next(error); }
};

const removeUser = async (req, res, next) => {
    try {
        if (Number(req.params.id) === req.user.id) {
            return next(new AppError("You cannot delete your own admin account", 400));
        }
        await deleteUser(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) { next(error); }
};

const listCompanies = async (req, res, next) => {
    try {
        res.status(200).json({ companies: await getAllCompaniesWithRecruiter() });
    } catch (error) { next(error); }
};

const removeCompany = async (req, res, next) => {
    try {
        await deleteCompany(req.params.id);
        res.status(200).json({ message: "Company deleted successfully" });
    } catch (error) { next(error); }
};

const listJobs = async (req, res, next) => {
    try {
        res.status(200).json({ jobs: await getAllJobsWithCompany() });
    } catch (error) { next(error); }
};

const removeJob = async (req, res, next) => {
    try {
        await deleteJob(req.params.id);
        res.status(200).json({ message: "Job listing deleted successfully" });
    } catch (error) { next(error); }
};

const listApplications = async (req, res, next) => {
    try {
        res.status(200).json({ applications: await getAllApplications() });
    } catch (error) { next(error); }
};

module.exports = {
    stats, listUsers, banUser, removeUser,
    listCompanies, removeCompany, listJobs, removeJob, listApplications
};