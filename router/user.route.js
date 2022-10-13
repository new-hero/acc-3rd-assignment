const express = require("express");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();


router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/me", verifyToken, userController.getMe);
router.get("/candidate", userController.getCandidate);
// router.get("/candidate/:id", userController.getCandidateById);


module.exports = router;