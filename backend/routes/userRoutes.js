const express = require("express");

const router = express.Router();

const {
    register,
    login,
    getCurrentUser
} = require("../controllers/userController");


const {
    registerValidation
} = require("../validations/userValidation");


const validate =
    require("../middleware/validationMiddleware");


const protect =
    require("../middleware/authMiddleware");


// REGISTER
router.post(
    "/register",
    registerValidation,
    validate,
    register
);


// LOGIN
router.post(
    "/login",
    login
);


// CURRENT USER
router.get(
    "/me",
    protect,
    getCurrentUser
);


module.exports = router;