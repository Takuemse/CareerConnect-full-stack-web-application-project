const {
  createApplication: createApplicationQuery,
  findApplication: findApplicationQuery,
  getApplicationsByApplicant: getByApplicantQuery,
  getApplicationsByJob: getByJobQuery,
  updateApplicationStatus: updateStatusQuery,
  getApplicationWithJob: getWithJobQuery,
} = require("../queries/applicationQueries");

const createApplication = (jobId, applicantId, coverLetter) =>
  createApplicationQuery(jobId, applicantId, coverLetter);

const findApplication = (jobId, applicantId) =>
  findApplicationQuery(jobId, applicantId);

const getApplicationsByApplicant = (applicantId) =>
  getByApplicantQuery(applicantId);

const getApplicationsByJob = (jobId) => getByJobQuery(jobId);

const updateApplicationStatus = (applicationId, status) =>
  updateStatusQuery(applicationId, status);

const getApplicationWithJob = (applicationId) =>
  getWithJobQuery(applicationId);

module.exports = {
  createApplication,
  findApplication,
  getApplicationsByApplicant,
  getApplicationsByJob,
  updateApplicationStatus,
  getApplicationWithJob,
};