const {
  createProfile: createProfileQuery,
  getProfileByUserId: getByUserIdQuery,
  getProfileById: getByIdQuery,
  updateProfile: updateProfileQuery,
  updateResume: updateResumeQuery,
} = require("../queries/profileQueries");

const normalizeProfileData = (
  dataOrPhone,
  location,
  bio,
  skills
) => {
  if (dataOrPhone && typeof dataOrPhone === "object") {
    return dataOrPhone;
  }

  return {
    phone: dataOrPhone,
    location,
    bio,
    skills,
  };
};

const createProfile = (
  userId,
  dataOrPhone,
  location,
  bio,
  skills
) =>
  createProfileQuery(
    userId,
    normalizeProfileData(dataOrPhone, location, bio, skills)
  );

const getMyProfile = (userId) => getByUserIdQuery(userId);

const getProfileByUserId = (userId) => getByUserIdQuery(userId);

const getProfileById = (id) => getByIdQuery(id);

const updateProfile = (
  userId,
  dataOrPhone,
  location,
  bio,
  skills
) =>
  updateProfileQuery(
    userId,
    normalizeProfileData(dataOrPhone, location, bio, skills)
  );

const updateResume = (userId, resumeUrl, resumeName) =>
  updateResumeQuery(userId, resumeUrl, resumeName);

module.exports = {
  createProfile,
  getMyProfile,
  getProfileByUserId,
  getProfileById,
  updateProfile,
  updateResume,
};