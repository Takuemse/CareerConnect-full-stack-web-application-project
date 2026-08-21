const express = require("express");
const {
    stats, listUsers, banUser, removeUser,
    listCompanies, removeCompany, listJobs, removeJob, listApplications
} = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();
router.use(protect, allowRoles("ADMIN"));

router.get("/stats", stats);
router.get("/users", listUsers);
router.patch("/users/:id/ban", banUser);
router.delete("/users/:id", removeUser);
router.get("/companies", listCompanies);
router.delete("/companies/:id", removeCompany);
router.get("/jobs", listJobs);
router.delete("/jobs/:id", removeJob);
router.get("/applications", listApplications);

module.exports = router;