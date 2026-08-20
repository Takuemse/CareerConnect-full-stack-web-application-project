const { createJob, getAllJobs, getJobById, updateJob, deleteJob} = require("../queries/jobQueries");

const { getCompanyById } = require("../queries/companyQueries");

const create = async (req, res) => {
    try {
        const { companyId, title, description, location, salaryMin, salaryMax, jobType } = req.body;

        if (!companyId || !title || !description) {
            return res.status(400).json({
                message: "Company, title and description are required"
            });
        }

        const company = await getCompanyById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        if (company.recruiter_id !== req.user.id) {
            return res.status(403).json({
                message: "You can only create jobs for your own company"
            });
        }

        const job = await createJob( companyId, title, description, location, salaryMin, salaryMax, jobType
        );

        res.status(201).json({
            message: "Job created successfully",
            job
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getAll = async (req, res) => {
    try {
        const jobs = await getAllJobs();

        res.status(200).json({
            jobs
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getOne = async (req, res) => {
    try {
        const job = await getJobById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json({
            job
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
        const job = await getJobById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const company = await getCompanyById(job.company_id);

        if (company.recruiter_id !== req.user.id) {
            return res.status(403).json({
                message: "You can only update your own jobs"
            });
        }

        const {  title,  description,  location,  salaryMin,  salaryMax, jobType } = req.body;

        const updatedJob = await updateJob( req.params.id, title, description, location, salaryMin, salaryMax, jobType);

        res.status(200).json({
            message: "Job updated successfully",
            job: updatedJob
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const remove = async (req, res) => {
    try {
        const job = await getJobById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const company = await getCompanyById(job.company_id);

        if (company.recruiter_id !== req.user.id) {
            return res.status(403).json({
                message: "You can only delete your own jobs"
            });
        }

        await deleteJob(req.params.id);

        res.status(200).json({
            message: "Job deleted successfully"
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
    getAll,
    getOne,
    update,
    remove
};