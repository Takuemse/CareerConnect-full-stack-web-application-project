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

const getAllJobs = async (filters) => {

    let query = `
        SELECT
            jobs.*,
            companies.name AS company_name
        FROM jobs
        JOIN companies
        ON jobs.company_id = companies.id
    `;

    const conditions = [];
    const values = [];

    let parameterIndex = 1;

    if (filters.keyword) {
        conditions.push(`
            (
                jobs.title ILIKE $${parameterIndex}
                OR jobs.description ILIKE $${parameterIndex}
            )
        `);

        values.push(`%${filters.keyword}%`);
        parameterIndex++;
    }

    if (filters.location) {
        conditions.push(
            `jobs.location ILIKE $${parameterIndex}`
        );

        values.push(`%${filters.location}%`);
        parameterIndex++;
    }

    if (filters.jobType) {
        conditions.push(
            `jobs.job_type = $${parameterIndex}`
        );

        values.push(filters.jobType);
        parameterIndex++;
    }

    // Fixed: Ensure minSalary is a valid number before adding condition
    if (filters.minSalary && !isNaN(filters.minSalary)) {
        conditions.push(
            `jobs.salary_max >= $${parameterIndex}`
        );

        values.push(Number(filters.minSalary));
        parameterIndex++;
    }

    // Fixed: Ensure maxSalary is a valid number before adding condition
    if (filters.maxSalary && !isNaN(filters.maxSalary)) {
        conditions.push(
            `jobs.salary_min <= $${parameterIndex}`
        );

        values.push(Number(filters.maxSalary));
        parameterIndex++;
    }

    if (filters.company) {
        conditions.push(
            `companies.name ILIKE $${parameterIndex}`
        );

        values.push(`%${filters.company}%`);
        parameterIndex++;
    }

    if (conditions.length > 0) {
        query += `
            WHERE ${conditions.join(" AND ")}
        `;
    }

    const limit = Math.min(
        Number(filters.limit) || 10,
        50
    );

    const offset =
        Number(filters.offset) || 0;

    query += `
        ORDER BY jobs.created_at DESC
        LIMIT $${parameterIndex}
        OFFSET $${parameterIndex + 1}
    `;

    values.push(limit);
    values.push(offset);

    const result = await pool.query(
        query,
        values
    );

    return result.rows;
};

const getJobById = async (id) => {
    const result = await pool.query('SELECT jobs.*, companies.name AS company_name FROM jobs JOIN companies ON jobs.company_id = companies.id WHERE jobs.id = $1',
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