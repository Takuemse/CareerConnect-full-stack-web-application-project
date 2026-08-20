const { query } = require("express-validator");

const jobSearchValidation = [

    query("minSalary")
        .optional()
        .isNumeric()
        .withMessage(
            "minSalary must be a number"
        ),

    query("maxSalary")
        .optional()
        .isNumeric()
        .withMessage(
            "maxSalary must be a number"
        ),

    query("limit")
        .optional()
        .isInt({ min: 1, max: 50 })
        .withMessage(
            "limit must be between 1 and 50"
        ),

    query("offset")
        .optional()
        .isInt({ min: 0 })
        .withMessage(
            "offset must be 0 or greater"
        ),

    query("jobType")
        .optional()
        .isIn([
            "FULL_TIME",
            "PART_TIME",
            "CONTRACT",
            "INTERNSHIP"
        ])
        .withMessage(
            "Invalid job type"
        )
];

module.exports = {
    jobSearchValidation
};