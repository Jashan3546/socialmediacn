const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const user_controller = require("../controllers/user_controller")

router.get("/profile", user_controller.users)
router.get('/signup', user_controller.signup)
router.get('/signin', user_controller.signin)
router.post('/create', user_controller.create)
router.post('/create-session', user_controller.createSession)

module.exports = router;