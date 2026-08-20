const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    createUser,
    findUserByEmail,
    findUserById
} = require("../queries/userQueries");

const AppError = require("../middleware/AppError");


// ==========================================
// REGISTER
// ==========================================

const register = async (req, res, next) => {

    try {

        const {
            name,
            email,
            password,
            role
        } = req.body;


        // Check if user already exists
        const existingUser =
            await findUserByEmail(email);

        if (existingUser) {
            return next(
                new AppError(
                    "User with this email already exists",
                    409
                )
            );
        }


        // Hash password
        const hashedPassword =
            await bcrypt.hash(password, 10);


        // Default role
        const userRole =
            role || "JOB_SEEKER";


        // Create user
        const user = await createUser(
            name,
            email,
            hashedPassword,
            userRole
        );


        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {

        next(error);
    }
};


// ==========================================
// LOGIN
// ==========================================

const login = async (req, res, next) => {

    try {

        const {
            email,
            password
        } = req.body;


        // Find user
        const user =
            await findUserByEmail(email);


        if (!user) {
            return next(
                new AppError(
                    "Invalid email or password",
                    401
                )
            );
        }


        // Compare password
        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {
            return next(
                new AppError(
                    "Invalid email or password",
                    401
                )
            );
        }


        // Create JWT
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        next(error);
    }
};


// ==========================================
// GET CURRENT USER
// ==========================================

const getCurrentUser = async (req, res, next) => {

    try {

        const user =
            await findUserById(req.user.id);


        if (!user) {
            return next(
                new AppError(
                    "User not found",
                    404
                )
            );
        }


        res.status(200).json({
            user
        });

    } catch (error) {

        next(error);
    }
};


module.exports = {
    register,
    login,
    getCurrentUser
};