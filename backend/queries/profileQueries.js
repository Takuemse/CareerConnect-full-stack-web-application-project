const prisma = require("../config/db");

const profileInclude = {
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  },
};

const createProfile = (userId, data) =>
  prisma.profile.create({
    data: {
      userId: Number(userId),
      headline: data.headline || null,
      phone: data.phone || null,
      location: data.location || null,
      bio: data.bio || null,
      skills: data.skills || [],
      experienceYears:
        data.experienceYears !== undefined
          ? Number(data.experienceYears)
          : null,
      linkedinUrl: data.linkedinUrl || null,
      portfolioUrl: data.portfolioUrl || null,
    },
    include: profileInclude,
  });

const getProfileByUserId = (userId) =>
  prisma.profile.findUnique({
    where: { userId: Number(userId) },
    include: profileInclude,
  });

const getProfileById = (id) =>
  prisma.profile.findUnique({
    where: { id: Number(id) },
    include: profileInclude,
  });

const updateProfile = (userId, data) =>
  prisma.profile.update({
    where: { userId: Number(userId) },
    data: {
      ...(data.headline !== undefined && { headline: data.headline }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.location !== undefined && { location: data.location }),
      ...(data.bio !== undefined && { bio: data.bio }),
      ...(data.skills !== undefined && { skills: data.skills }),
      ...(data.experienceYears !== undefined && {
        experienceYears: Number(data.experienceYears),
      }),
      ...(data.linkedinUrl !== undefined && {
        linkedinUrl: data.linkedinUrl,
      }),
      ...(data.portfolioUrl !== undefined && {
        portfolioUrl: data.portfolioUrl,
      }),
    },
    include: profileInclude,
  });

const updateResume = (userId, resumeUrl, resumeName) =>
  prisma.profile.update({
    where: { userId: Number(userId) },
    data: { resumeUrl, resumeName },
    include: profileInclude,
  });

module.exports = {
  createProfile,
  getProfileByUserId,
  getProfileById,
  updateProfile,
  updateResume,
};