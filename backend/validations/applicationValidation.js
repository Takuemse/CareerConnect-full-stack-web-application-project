const { body } = require("express-validator");

const applicationValidation = [
    body("coverLetter").optional({ values: "falsy" }).trim().isLength({ max: 3000 }).withMessage("Cover letter is too long")
];

const applicationStatusValidation = [
    body("status")
        .notEmpty()
        .withMessage("Status is required")
        .isIn(["PENDING", "REVIEWED", "ACCEPTED", "REJECTED"])
        .withMessage("Invalid application status")
];

module.exports = { applicationValidation, applicationStatusValidation };