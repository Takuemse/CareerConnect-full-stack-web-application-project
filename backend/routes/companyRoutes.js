const express = require("express");
const {   companyValidation } = require('../validations/companyValidation')
const validate = require('../middleware/validationMiddleware')

const { create, getAll, getOne, update, remove } = require("../controllers/companyController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, allowRoles("RECRUITER"), companyValidation, validate, create);

router.get("/", getAll);

router.get("/:id", getOne);

router.put("/:id", protect, allowRoles("RECRUITER"), update);

router.delete( "/:id", protect, allowRoles("RECRUITER"), remove);

module.exports = router;