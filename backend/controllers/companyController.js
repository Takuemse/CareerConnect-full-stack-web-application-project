const {
    createCompany, getAllCompanies, getCompanyById,
    getCompanyByRecruiterId, updateCompany, deleteCompany
} = require("../services/companyService");
const AppError = require("../middleware/AppError");

const create = async (req, res, next) => {
    try {
        const existing = await getCompanyByRecruiterId(req.user.id);
        if (existing) {
            return next(new AppError("You already have a company profile", 409));
        }
        const { name, description, location, website, industry } = req.body;
        const company = await createCompany(req.user.id, name, description, location, website, industry);
        res.status(201).json({ message: "Company created successfully", company });
    } catch (error) { next(error); }
};

const getAll = async (req, res, next) => {
    try {
        const companies = await getAllCompanies();
        res.status(200).json({ companies });
    } catch (error) { next(error); }
};

const getOne = async (req, res, next) => {
    try {
        const company = await getCompanyById(req.params.id);
        if (!company) return next(new AppError("Company not found", 404));
        res.status(200).json({ company });
    } catch (error) { next(error); }
};

const getMine = async (req, res, next) => {
    try {
        const company = await getCompanyByRecruiterId(req.user.id);
        if (!company) return next(new AppError("You have not created a company profile yet", 404));
        res.status(200).json({ company });
    } catch (error) { next(error); }
};

const update = async (req, res, next) => {
    try {
        const company = await getCompanyById(req.params.id);
        if (!company) return next(new AppError("Company not found", 404));
        if (company.recruiterId !== req.user.id) {
            return next(new AppError("You can only update your own company", 403));
        }
        const { name, description, location, website, industry } = req.body;
        const updated = await updateCompany(req.params.id, { name, description, location, website, industry });
        res.status(200).json({ message: "Company updated successfully", company: updated });
    } catch (error) { next(error); }
};

const remove = async (req, res, next) => {
    try {
        const company = await getCompanyById(req.params.id);
        if (!company) return next(new AppError("Company not found", 404));
        if (company.recruiterId !== req.user.id) {
            return next(new AppError("You can only delete your own company", 403));
        }
        await deleteCompany(req.params.id);
        res.status(200).json({ message: "Company deleted successfully" });
    } catch (error) { next(error); }
};

module.exports = { create, getAll, getOne, getMine, update, remove };