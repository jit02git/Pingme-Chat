const express = require('express');
const _userController = require('../Controllers/UserController');
const router = express.Router();

router.post('/register', _userController.register);
router.post('/login', _userController.login);

module.exports = router;