const {
  createCompany: createCompanyQuery,
  getAllCompanies: getAllCompaniesQuery,
  getCompanyById: getCompanyByIdQuery,
  getCompaniesByRecruiter: getCompaniesByRecruiterQuery,
  updateCompany: updateCompanyQuery,
  deleteCompany: deleteCompanyQuery,
} = require("../queries/companyQueries");

const createCompany = (recruiterId, data) =>
  createCompanyQuery(
    recruiterId,
    data.name,
    data.description,
    data.location,
    data.website,
    data.industry
  );

const getAllCompanies = () => getAllCompaniesQuery();
const getCompanyById = (id) => getCompanyByIdQuery(id);
const getCompaniesByRecruiter = (id) =>
  getCompaniesByRecruiterQuery(id);
const updateCompany = (id, data) => updateCompanyQuery(id, data);
const deleteCompany = (id) => deleteCompanyQuery(id);


const getCompanyByRecruiterId = async (recruiterId) => {
  const companies = await getCompaniesByRecruiterQuery(recruiterId);
  return companies[0] || null;
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  getCompaniesByRecruiter,
  getCompanyByRecruiterId,
  updateCompany,
  deleteCompany,
};
