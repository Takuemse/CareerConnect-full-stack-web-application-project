const {
  createJob: createJobQuery,
  getAllJobs: getAllJobsQuery,
  getJobById: getJobByIdQuery,
  getJobsByRecruiter: getJobsByRecruiterQuery,
  updateJob: updateJobQuery,
  deleteJob: deleteJobQuery,
} = require("../queries/jobQueries");

const createJob = (companyId, data = {}) =>
  createJobQuery(
    companyId,
    data.title,
    data.description,
    data.requirements,
    data.location,
    data.salaryMin,
    data.salaryMax,
    data.jobType
  );

const getAllJobs = (filters = {}) =>
  getAllJobsQuery(filters || {});

const getJobById = (id) =>
  getJobByIdQuery(id);

const getJobsByRecruiter = (recruiterId) =>
  getJobsByRecruiterQuery(recruiterId);

const getJobsByCompanyId = async (companyId) => {
  const jobs = await getAllJobsQuery({});
  return jobs.filter((job) => job.companyId === Number(companyId));
};

const updateJob = (id, data = {}) =>
  updateJobQuery(id, data);

const deleteJob = (id) =>
  deleteJobQuery(id);

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  getJobsByRecruiter,
  getJobsByCompanyId,
  updateJob,
  deleteJob,
};