const pool = require('../config/db')

const createProfile = async (
    userId,
    phone,
    location,
    bio,
    skills
) => {
    const result = await pool.query('INSERT INTO profiles(user_id, phone, location, bio, skills) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [
            userId,
            phone,
            location,
            bio,
            skills
        ]
    );

    return result.rows[0];
};

const getProfileByUserId = async (userId) => {
    const result = await pool.query( 'SELECT profiles.*, users.name, users.email FROM profiles JOIN users ON profiles.user_id = users.id WHERE profiles.user_id = $1',
        [userId]
    );

    return result.rows[0];
};

const getProfileById = async (id) => {
    const result = await pool.query( 'SELECT profiles.*, users.name, users.email FROM profiles JOIN users ON profiles.user_id = users.id WHERE profiles.id = $1',
        [id]
    );

    return result.rows[0];
};

const updateProfile = async (
    userId,
    phone,
    location,
    bio,
    skills
) => {
    const result = await pool.query('UPDATE profiles SET phone = $1, location = $2, bio = $3, skills = $4, updated_at = CURRENT_TIMESTAMP WHERE user_id = $5 RETURNING *',
        [
            phone,
            location,
            bio,
            skills,
            userId
        ]
    );

    return result.rows[0];
};

const updateResume = async (
    userId,
    resume
) => {
    const result = await pool.query('UPDATE profiles SET resume = $1,updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 RETURNING *',
        [
            resume,
            userId
        ]
    );

    return result.rows[0];
};
module.exports = {
    createProfile,
    getProfileByUserId,
    getProfileById,
    updateProfile,
    updateResume
};