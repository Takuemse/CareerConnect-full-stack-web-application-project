const { body } = require("express-validator");

const companyValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Company name is required")
        .isLength({ min: 2 })
        .withMessage("Company name must be at least 2 characters"),

    body("description")
        .optional({ values: "falsy" })
        .trim()
        .isLength({ max: 1000 })
        .withMessage("Description cannot exceed 1000 characters"),

    body("location").optional({ values: "falsy" }).trim(),

    body("website")
        .optional({ values: "falsy" })
        .trim()
        .isURL()
        .withMessage("Website must be a valid URL"),

    body("industry").optional({ values: "falsy" }).trim()
];

module.exports = { companyValidation };