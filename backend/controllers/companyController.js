const { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany } = require("../queries/companyQueries");

const create = async (req, res) => {
    try {
        const { name, description, location, website } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Company name is required"
            });
        }

        const company = await createCompany( req.user.id, name, description, location, website );

        res.status(201).json({
            message: "Company created successfully",
            company
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
        const companies = await getAllCompanies();

        res.status(200).json({
            companies
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
        const company = await getCompanyById(req.params.id);

        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        res.status(200).json({
            company
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
        const company = await getCompanyById(req.params.id);

        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        if (company.recruiter_id !== req.user.id) {
            return res.status(403).json({
                message: "You can only update your own company"
            });
        }

        const { name, description, location, website } = req.body;

        const updatedCompany = await updateCompany( req.params.id, name, description, location, website );

        res.status(200).json({
            message: "Company updated successfully",
            company: updatedCompany
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
        const company = await getCompanyById(req.params.id);

        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        if (company.recruiter_id !== req.user.id) {
            return res.status(403).json({
                message: "You can only delete your own company"
            });
        }

        await deleteCompany(req.params.id);

        res.status(200).json({
            message: "Company deleted successfully"
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