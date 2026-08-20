const { body } = require("express-validator");

const applicationValidation = [

    body("job_id")
        .notEmpty()
        .withMessage("Job ID is required")
        .isInt({ min: 1 })
        .withMessage(
            "Job ID must be a valid number"
        )
];

const applicationStatusValidation = [

    body("status")
        .notEmpty()
        .withMessage("Status is required")
        .isIn([
            "PENDING",
            "REVIEWING",
            "ACCEPTED",
            "REJECTED"
        ])
        .withMessage("Invalid application status")
];

module.exports = {
    applicationValidation,
    applicationStatusValidation
};