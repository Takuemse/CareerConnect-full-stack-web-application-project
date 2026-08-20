const pool = require("../config/db");

const createJob = async (
    companyId,
    title,
    description,
    location,
    salaryMin,
    salaryMax,
    jobType
) => {
    const result = await pool.query('INSERT INTO jobs(company_id, title, description, location, salary_min, salary_max, job_type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [
            companyId,
            title,
            description,
            location,
            salaryMin,
            salaryMax,
            jobType
        ]
    );

    return result.rows[0];
};

const getAllJobs = async () => {
    const result = await pool.query('SELECT jobs.*, companies.name AS company_name FROM jobs JOIN companies ON jobs.company_id = companies.id ORDER BY jobs.created_at DESC');

    return result.rows;
};

const getJobById = async (id) => {
    const result = await pool.query( 'SELECT jobs.*,  companies.name AS company_name FROM jobs JOIN companies ON jobs.company_id = companies.id WHERE jobs.id = $1',
        [id]
    );

    return result.rows[0];
};

const updateJob = async (
    id,
    title,
    description,
    location,
    salaryMin,
    salaryMax,
    jobType
) => {
    const result = await pool.query('UPDATE jobs SET title = $1, description = $2, location = $3, salary_min = $4, salary_max = $5, job_type = $6 WHERE id = $7 RETURNING *',
        [
            title,
            description,
            location,
            salaryMin,
            salaryMax,
            jobType,
            id
        ]
    );

    return result.rows[0];
};

const deleteJob = async (id) => {
    const result = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING *',
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
};