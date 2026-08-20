const { body } = require("express-validator");

const createJobValidation = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Job title is required")
        .isLength({ min: 3 })
        .withMessage("Job title must be at least 3 characters"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Job description is required")
        .isLength({ min: 20 })
        .withMessage(
            "Job description must be at least 20 characters"
        ),

    body("location")
        .trim()
        .notEmpty()
        .withMessage("Location is required"),

    body("salary_min")
        .notEmpty()
        .withMessage("Minimum salary is required")
        .isNumeric()
        .withMessage("Minimum salary must be a number")
        .custom((value) => {
            if (Number(value) < 0) {
                throw new Error(
                    "Minimum salary cannot be negative"
                );
            }

            return true;
        }),

    body("salary_max")
        .notEmpty()
        .withMessage("Maximum salary is required")
        .isNumeric()
        .withMessage("Maximum salary must be a number")
        .custom((value, { req }) => {

            if (
                Number(value) < 0
            ) {
                throw new Error(
                    "Maximum salary cannot be negative"
                );
            }

            if (
                req.body.salary_min !== undefined &&
                Number(value) <
                Number(req.body.salary_min)
            ) {
                throw new Error(
                    "Maximum salary cannot be less than minimum salary"
                );
            }

            return true;
        }),

    body("job_type")
        .trim()
        .notEmpty()
        .withMessage("Job type is required")
        .isIn([
            "FULL_TIME",
            "PART_TIME",
            "CONTRACT",
            "INTERNSHIP"
        ])
        .withMessage("Invalid job type")
];

module.exports = {
    createJobValidation
};