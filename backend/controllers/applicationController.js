const { createApplication, findApplication, getApplicationsByApplicant, getApplicationsByJob, getApplicationWithJob, updateApplicationStatus } = require("../queries/applicationQueries");

const { getJobById } = require("../queries/jobQueries");

const { getCompanyById } = require("../queries/companyQueries");


const apply = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { coverLetter } = req.body;

        // Check job exists
        const job = await getJobById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        // Check duplicate application
        const existingApplication = await findApplication(
            jobId,
            req.user.id
        );

        if (existingApplication) {
            return res.status(409).json({
                message: "You have already applied for this job"
            });
        }

        // Create application
        const application = await createApplication(
            jobId,
            req.user.id,
            coverLetter
        );

        res.status(201).json({
            message: "Application submitted successfully",
            application
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getMyApplications = async (req, res) => {
    try {
        const applications =
            await getApplicationsByApplicant(req.user.id);

        res.status(200).json({
            applications
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getJobApplications = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await getJobById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const company = await getCompanyById(
            job.company_id
        );

        if (company.recruiter_id !== req.user.id) {
            return res.status(403).json({
                message:
                    "You can only view applications for your own jobs"
            });
        }

        const applications =
            await getApplicationsByJob(jobId);

        res.status(200).json({
            applications
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            "PENDING",
            "REVIEWING",
            "SHORTLISTED",
            "REJECTED",
            "ACCEPTED"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid application status"
            });
        }

        const applicationResult = await getApplicationWithJob(
            applicationId
        );

        if (!applicationResult) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        const company = await getCompanyById(
            applicationResult.company_id
        );

        if (company.recruiter_id !== req.user.id) {
            return res.status(403).json({
                message:
                    "You can only update applications for your own jobs"
            });
        }

        const updatedApplication =
            await updateApplicationStatus(
                applicationId,
                status
            );

        res.status(200).json({
            message: "Application status updated",
            application: updatedApplication
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    apply,
    getMyApplications,
    getJobApplications,
    updateStatus
};