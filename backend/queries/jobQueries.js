const prisma = require("../config/db");

const jobInclude = {
  company: {
    select: {
      id: true,
      name: true,
      description: true,
      location: true,
      website: true,
      industry: true,
      recruiterId: true,
    },
  },
  _count: {
    select: {
      applications: true,
    },
  },
};

const createJob = async (
  companyId,
  title,
  description,
  requirements,
  location,
  salaryMin,
  salaryMax,
  jobType
) => {
  return prisma.job.create({
    data: {
      companyId: Number(companyId),
      title,
      description,
      requirements: requirements || null,
      location,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      jobType,
    },
    include: jobInclude,
  });
};

const getAllJobs = async (filters = {}) => {
  filters = filters || {};

  const where = {};

  if (filters.keyword) {
    where.OR = [
      {
        title: {
          contains: String(filters.keyword),
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: String(filters.keyword),
          mode: "insensitive",
        },
      },
    ];
  }

  if (filters.location) {
    where.location = {
      contains: String(filters.location),
      mode: "insensitive",
    };
  }

  if (filters.company) {
    where.company = {
      name: {
        contains: String(filters.company),
        mode: "insensitive",
      },
    };
  }

  if (filters.jobType) {
    where.jobType = filters.jobType;
  }

  const minSalary = Number(filters.minSalary);
  if (filters.minSalary !== undefined && Number.isFinite(minSalary)) {
    where.salaryMax = {
      gte: minSalary,
    };
  }

  const maxSalary = Number(filters.maxSalary);
  if (filters.maxSalary !== undefined && Number.isFinite(maxSalary)) {
    where.salaryMin = {
      lte: maxSalary,
    };
  }

  const requestedLimit = Number(filters.limit);
  const requestedOffset = Number(filters.offset);

  const take =
    Number.isInteger(requestedLimit) && requestedLimit > 0
      ? Math.min(requestedLimit, 50)
      : 10;

  const skip =
    Number.isInteger(requestedOffset) && requestedOffset >= 0
      ? requestedOffset
      : 0;

  return prisma.job.findMany({
    where,
    include: jobInclude,
    orderBy: {
      createdAt: "desc",
    },
    take,
    skip,
  });
};

const getJobById = async (id) => {
  return prisma.job.findUnique({
    where: {
      id: Number(id),
    },
    include: jobInclude,
  });
};

const getJobsByRecruiter = async (recruiterId) => {
  return prisma.job.findMany({
    where: {
      company: {
        recruiterId: Number(recruiterId),
      },
    },
    include: jobInclude,
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateJob = async (id, data = {}) => {
  const updateData = {};

  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) {
    updateData.description = data.description;
  }
  if (data.requirements !== undefined) {
    updateData.requirements = data.requirements || null;
  }
  if (data.location !== undefined) updateData.location = data.location;
  if (data.salaryMin !== undefined) {
    updateData.salaryMin = Number(data.salaryMin);
  }
  if (data.salaryMax !== undefined) {
    updateData.salaryMax = Number(data.salaryMax);
  }
  if (data.jobType !== undefined) updateData.jobType = data.jobType;
  if (data.status !== undefined) updateData.status = data.status;

  return prisma.job.update({
    where: {
      id: Number(id),
    },
    data: updateData,
    include: jobInclude,
  });
};

const deleteJob = async (id) => {
  return prisma.job.delete({
    where: {
      id: Number(id),
    },
    include: jobInclude,
  });
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  getJobsByRecruiter,
  updateJob,
  deleteJob,
};