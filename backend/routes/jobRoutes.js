const express = require("express");
const {  createJobValidation } = require("../validations/jobValidation");
const {  jobSearchValidation, } = require("../validations/jobSearchValidation");

const validate = require("../middleware/validationMiddleware");

const { create, getAll, getOne, update, remove } = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    allowRoles("RECRUITER"),
    createJobValidation,
    validate,
    create
);

router.get("/", jobSearchValidation, validate,getAll);

router.get("/:id", getOne);

router.put(
    "/:id",
    protect,
    allowRoles("RECRUITER"),
    update
);

router.delete(
    "/:id",
    protect,
    allowRoles("RECRUITER"),
    remove
);

module.exports = router;