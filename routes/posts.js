const express = require("express");
const router = express.Router();
const passport = require('passport');
const { pass } = require("../config/mongoose");

const postcontroller = require('../controllers/post_controllers');

router.post('/create', passport.checkAuthentication, postcontroller.create);
router.get('/destroy/:id', passport.checkAuthentication, postcontroller.destroy);

module.exports = router;