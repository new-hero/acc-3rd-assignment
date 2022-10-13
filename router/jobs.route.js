const express = require("express")
const router= express.Router();
const jobsController = require("../controllers/jobs.controller");
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");

router.route("/")
.get(jobsController.getJobs)
.post(verifyToken, authorization("admin", "manager"), jobsController.createAJob)
router.route("/:id/apply")
.post(verifyToken, jobsController.applyForJob)
router.route("/:id")
.get(jobsController.getJobById)
.patch(verifyToken, authorization("admin", "manager"),jobsController.updateJob)

module.exports = router