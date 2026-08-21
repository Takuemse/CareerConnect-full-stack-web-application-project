const prisma = require("../config/db");

const applicationInclude = {
  job: {
    include: {
      company: true,
    },
  },
  applicant: {
    include: {
      profile: true,
    },
  },
};

const createApplication = (jobId, applicantId, coverLetter) =>
  prisma.application.create({
    data: {
      jobId: Number(jobId),
      applicantId: Number(applicantId),
      coverLetter: coverLetter || null,
    },
    include: applicationInclude,
  });

const findApplication = (jobId, applicantId) =>
  prisma.application.findUnique({
    where: {
      jobId_applicantId: {
        jobId: Number(jobId),
        applicantId: Number(applicantId),
      },
    },
    include: applicationInclude,
  });

const getApplicationsByApplicant = (applicantId) =>
  prisma.application.findMany({
    where: { applicantId: Number(applicantId) },
    include: applicationInclude,
    orderBy: { appliedAt: "desc" },
  });

const getApplicationsByJob = (jobId) =>
  prisma.application.findMany({
    where: { jobId: Number(jobId) },
    include: applicationInclude,
    orderBy: { appliedAt: "desc" },
  });

const updateApplicationStatus = (applicationId, status) =>
  prisma.application.update({
    where: { id: Number(applicationId) },
    data: { status },
    include: applicationInclude,
  });

const getApplicationWithJob = (applicationId) =>
  prisma.application.findUnique({
    where: { id: Number(applicationId) },
    include: {
      job: {
        select: {
          id: true,
          companyId: true,
          company: {
            select: { recruiterId: true },
          },
        },
      },
    },
  });

module.exports = {
  createApplication,
  findApplication,
  getApplicationsByApplicant,
  getApplicationsByJob,
  updateApplicationStatus,
  getApplicationWithJob,
};