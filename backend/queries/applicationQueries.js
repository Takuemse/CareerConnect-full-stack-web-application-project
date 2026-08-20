const pool = require("../config/db");

const createApplication = async (
    jobId,
    applicantId,
    coverLetter
) => {
    const result = await pool.query(
        `INSERT INTO applications
        (job_id, applicant_id, cover_letter)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [
            jobId,
            applicantId,
            coverLetter
        ]
    );

    return result.rows[0];
};

const findApplication = async (
    jobId,
    applicantId
) => {
    const result = await pool.query(
        `SELECT *
         FROM applications
         WHERE job_id = $1
         AND applicant_id = $2`,
        [
            jobId,
            applicantId
        ]
    );

    return result.rows[0];
};

const getApplicationsByApplicant = async (
    applicantId
) => {
    const result = await pool.query( 'SELECT applications.id, applications.status, applications.cover_letter, applications.applied_at, jobs.id AS job_id, jobs.title AS job_title, jobs.location, jobs.job_type, companies.id AS company_id, companies.name AS company_name FROM applications JOIN jobs ON applications.job_id = jobs.id JOIN companies ON jobs.company_id = companies.id WHERE applications.applicant_id = $1 ORDER BY applications.applied_at DESC',
        [applicantId]
    );

    return result.rows;
};

const getApplicationsByJob = async (jobId) => {
    const result = await pool.query( 'SELECT applications.id, applications.status, applications.cover_letter, applications.applied_at users.id AS applicant_id,  users.name AS applicant_name,  users.email AS applicant_email, profiles.phone, profiles.location, profiles.skills, profiles.resume FROM applications JOIN users ON applications.applicant_id = users.id LEFT JOIN profiles ON users.id = profiles.user_id WHERE applications.job_id = $1 ORDER BY applications.applied_at DESC',
        [jobId]
    );

    return result.rows;
};

const updateApplicationStatus = async (
    applicationId,
    status
) => {
    const result = await pool.query(' UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
        [
            status,
            applicationId
        ]
    );

    return result.rows[0];
};
const getApplicationWithJob = async (applicationId) => {
    const result = await pool.query(
        `SELECT
            applications.*,
            jobs.company_id
         FROM applications
         JOIN jobs
         ON applications.job_id = jobs.id
         WHERE applications.id = $1`,
        [applicationId]
    );

    return result.rows[0];
};
module.exports = {
    createApplication,
    findApplication,
    getApplicationsByApplicant,
    getApplicationsByJob,
    updateApplicationStatus,
    getApplicationWithJob
};