const {
    createApplication, findApplication, getApplicationsByApplicant,
    getApplicationsByJob, getApplicationWithJob, updateApplicationStatus
} = require("../services/applicationService");
const { getJobById } = require("../services/jobService");
const { getCompanyById } = require("../services/companyService");
const AppError = require("../middleware/AppError");

const apply = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const { coverLetter } = req.body;

        const job = await getJobById(jobId);
        if (!job) return next(new AppError("Job not found", 404));
        if (job.status !== "ACTIVE") {
            return next(new AppError("This job is no longer accepting applications", 400));
        }

        const existing = await findApplication(jobId, req.user.id);
        if (existing) return next(new AppError("You have already applied for this job", 409));

        const application = await createApplication(jobId, req.user.id, coverLetter);
        res.status(201).json({ message: "Application submitted successfully", application });
    } catch (error) { next(error); }
};

const getMyApplications = async (req, res, next) => {
    try {
        const applications = await getApplicationsByApplicant(req.user.id);
        res.status(200).json({ applications });
    } catch (error) { next(error); }
};

const getJobApplications = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const job = await getJobById(jobId);
        if (!job) return next(new AppError("Job not found", 404));

        const company = await getCompanyById(job.companyId);
        if (company.recruiterId !== req.user.id) {
            return next(new AppError("You can only view applications for your own jobs", 403));
        }

        const applications = await getApplicationsByJob(jobId);
        res.status(200).json({ applications });
    } catch (error) { next(error); }
};

const updateStatus = async (req, res, next) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        const application = await getApplicationWithJob(applicationId);
        if (!application) return next(new AppError("Application not found", 404));

        const company = await getCompanyById(application.job.companyId);
        if (company.recruiterId !== req.user.id) {
            return next(new AppError("You can only update applications for your own jobs", 403));
        }

        const updated = await updateApplicationStatus(applicationId, status);
        res.status(200).json({ message: "Application status updated", application: updated });
    } catch (error) { next(error); }
};

module.exports = { apply, getMyApplications, getJobApplications, updateStatus };