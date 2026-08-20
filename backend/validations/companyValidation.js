const { body } = require("express-validator");

const companyValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Company name is required")
        .isLength({ min: 2 })
        .withMessage(
            "Company name must be at least 2 characters"
        ),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage(
            "Description cannot exceed 1000 characters"
        ),

    body("location")
        .optional()
        .trim()
];

module.exports = {
    companyValidation
};