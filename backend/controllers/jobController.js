const {
  createJob,
  getAllJobs,
  getJobById,
  getJobsByCompanyId,
  updateJob,
  deleteJob,
} = require("../services/jobService");

const {
  getCompanyByRecruiterId,
  getCompanyById,
} = require("../services/companyService");

const AppError = require("../middleware/AppError");

const create = async (req, res, next) => {
  try {
    const company = await getCompanyByRecruiterId(req.user.id);

    if (!company) {
      return next(
        new AppError("Create a company profile before posting jobs", 400)
      );
    }

    const job = await createJob(company.id, req.body);

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const jobs = await getAllJobs(req.query || {});

    res.status(200).json({
      count: jobs.length,
      total: jobs.length,
      limit: Number(req.query.limit) || 10,
      offset: Number(req.query.offset) || 0,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const job = await getJobById(req.params.id);

    if (!job) {
      return next(new AppError("Job not found", 404));
    }

    res.status(200).json({ job });
  } catch (error) {
    next(error);
  }
};

const getMine = async (req, res, next) => {
  try {
    const company = await getCompanyByRecruiterId(req.user.id);

    if (!company) {
      return res.status(200).json({ jobs: [] });
    }

    const jobs = await getJobsByCompanyId(company.id);

    res.status(200).json({ jobs });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const job = await getJobById(req.params.id);

    if (!job) {
      return next(new AppError("Job not found", 404));
    }

    const company = await getCompanyById(job.companyId);

    if (!company || company.recruiterId !== req.user.id) {
      return next(
        new AppError("You can only update your own jobs", 403)
      );
    }

    const updated = await updateJob(req.params.id, req.body);

    res.status(200).json({
      message: "Job updated successfully",
      job: updated,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const job = await getJobById(req.params.id);

    if (!job) {
      return next(new AppError("Job not found", 404));
    }

    const company = await getCompanyById(job.companyId);

    if (!company || company.recruiterId !== req.user.id) {
      return next(
        new AppError("You can only delete your own jobs", 403)
      );
    }

    await deleteJob(req.params.id);

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  getMine,
  update,
  remove,
};