const express = require("express")
const router= express.Router();
const jobsController = require("../controllers/jobs.controller");
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");

router.route("/jobs")
.get(verifyToken, authorization("admin","manager"), jobsController.getManagerCreatedJobs)

router.route("/jobs/:id")
.get(verifyToken, authorization("admin","manager"), jobsController.getManagerCreatedJobsById)

module.exports =router