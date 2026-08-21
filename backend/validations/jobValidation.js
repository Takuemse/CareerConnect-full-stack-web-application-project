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
        .withMessage("Job description must be at least 20 characters"),

    body("requirements").optional({ values: "falsy" }).trim(),

    body("location").trim().notEmpty().withMessage("Location is required"),

    body("salaryMin")
        .notEmpty()
        .withMessage("Minimum salary is required")
        .isNumeric()
        .withMessage("Minimum salary must be a number")
        .custom((value) => {
            if (Number(value) < 0) {
                throw new Error("Minimum salary cannot be negative");
            }
            return true;
        }),

    body("salaryMax")
        .notEmpty()
        .withMessage("Maximum salary is required")
        .isNumeric()
        .withMessage("Maximum salary must be a number")
        .custom((value, { req }) => {
            if (Number(value) < 0) {
                throw new Error("Maximum salary cannot be negative");
            }
            if (
                req.body.salaryMin !== undefined &&
                Number(value) < Number(req.body.salaryMin)
            ) {
                throw new Error("Maximum salary cannot be less than minimum salary");
            }
            return true;
        }),

    body("jobType")
        .trim()
        .notEmpty()
        .withMessage("Job type is required")
        .isIn(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"])
        .withMessage("Invalid job type")
];

const updateJobValidation = [
    body("title")
        .optional({ values: "falsy" })
        .trim()
        .isLength({ min: 3 })
        .withMessage("Job title must be at least 3 characters"),

    body("description")
        .optional({ values: "falsy" })
        .trim()
        .isLength({ min: 20 })
        .withMessage("Job description must be at least 20 characters"),

    body("requirements").optional({ values: "falsy" }).trim(),

    body("location").optional({ values: "falsy" }).trim(),

    body("salaryMin")
        .optional()
        .isNumeric()
        .withMessage("Minimum salary must be a number"),

    body("salaryMax")
        .optional()
        .isNumeric()
        .withMessage("Maximum salary must be a number")
        .custom((value, { req }) => {
            if (
                req.body.salaryMin !== undefined &&
                value !== undefined &&
                Number(value) < Number(req.body.salaryMin)
            ) {
                throw new Error("Maximum salary cannot be less than minimum salary");
            }
            return true;
        }),

    body("jobType")
        .optional({ values: "falsy" })
        .isIn(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"])
        .withMessage("Invalid job type"),

    body("status")
        .optional({ values: "falsy" })
        .isIn(["ACTIVE", "CLOSED"])
        .withMessage("Invalid job status")
];

module.exports = { createJobValidation, updateJobValidation };