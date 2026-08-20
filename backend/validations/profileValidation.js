const { body } = require("express-validator");

const profileValidation = [

    body("phone")
        .optional()
        .trim()
        .isLength({ min: 7 })
        .withMessage(
            "Phone number is too short"
        ),

    body("location")
        .optional()
        .trim(),

    body("bio")
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage(
            "Bio cannot exceed 1000 characters"
        ),

    body("skills")
        .optional()
        .trim()
];

module.exports = {
    profileValidation
};