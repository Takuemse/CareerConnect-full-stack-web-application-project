
const pool = require("../config/db");

const createCompany = async (
    recruiterId,
    name,
    description,
    location,
    website
) => {
    const result = await pool.query(
        'INSERT INTO companies(recruiter_id, name, description, location, website) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [
            recruiterId,
            name,
            description,
            location,
            website
        ]
    );

    return result.rows[0];
};

const getAllCompanies = async () => {
    const result = await pool.query( 'SELECT * FROM companies ORDER BY id DESC');

    return result.rows;
};

const getCompanyById = async (id) => {
    const result = await pool.query('SELECT * FROM companies WHERE id = $1',
      [id]
    );

    return result.rows[0];
};

const updateCompany = async (
    id,
    name,
    description,
    location,
    website
) => {
    const result = await pool.query('UPDATE companies SET name = $1, description = $2, location = $3, website = $4 WHERE id = $5 RETURNING *',
        [
            name,
            description,
            location,
            website,
            id
        ]
    );

    return result.rows[0];
};

const deleteCompany = async (id) => {
    const result = await pool.query( 'DELETE FROM companies WHERE id = $1 RETURNING *',
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
};