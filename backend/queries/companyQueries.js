const prisma = require("../config/db");

const companyInclude = {
  recruiter: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
  _count: {
    select: { jobs: true },
  },
};

const createCompany = (
  recruiterId,
  name,
  description,
  location,
  website,
  industry
) =>
  prisma.company.create({
    data: {
      recruiterId: Number(recruiterId),
      name,
      description: description || null,
      location: location || null,
      website: website || null,
      industry: industry || null,
    },
    include: companyInclude,
  });

const getAllCompanies = () =>
  prisma.company.findMany({
    include: companyInclude,
    orderBy: { id: "desc" },
  });

const getCompanyById = (id) =>
  prisma.company.findUnique({
    where: { id: Number(id) },
    include: companyInclude,
  });

const getCompaniesByRecruiter = (recruiterId) =>
  prisma.company.findMany({
    where: { recruiterId: Number(recruiterId) },
    include: companyInclude,
    orderBy: { id: "desc" },
  });

const updateCompany = (
  id,
  name,
  description,
  location,
  website,
  industry
) =>
  prisma.company.update({
    where: { id: Number(id) },
    data: {
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(location !== undefined && { location }),
      ...(website !== undefined && { website }),
      ...(industry !== undefined && { industry }),
    },
    include: companyInclude,
  });

const deleteCompany = (id) =>
  prisma.company.delete({
    where: { id: Number(id) },
  });

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  getCompaniesByRecruiter,
  updateCompany,
  deleteCompany,
};