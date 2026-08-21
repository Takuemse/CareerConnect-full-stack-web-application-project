const { body } = require("express-validator");

const profileValidation = [
    body("headline").optional({ values: "falsy" }).trim().isLength({ max: 150 }),
    body("phone").optional({ values: "falsy" }).trim().isLength({ min: 7 }).withMessage("Phone number is too short"),
    body("location").optional({ values: "falsy" }).trim(),
    body("bio").optional({ values: "falsy" }).trim().isLength({ max: 1000 }).withMessage("Bio cannot exceed 1000 characters"),
    body("skills").optional().isArray().withMessage("Skills must be an array of strings"),
    body("experienceYears").optional({ values: "falsy" }).isInt({ min: 0, max: 60 }).withMessage("Experience years must be a valid number"),
    body("linkedinUrl").optional({ values: "falsy" }).trim().isURL().withMessage("LinkedIn URL must be valid"),
    body("portfolioUrl").optional({ values: "falsy" }).trim().isURL().withMessage("Portfolio URL must be valid")
];

module.exports = { profileValidation };