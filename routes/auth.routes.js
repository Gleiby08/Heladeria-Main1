// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/login', authController.showLoginPage);

router.post('/login', authController.handleLogin);

router.get('/logout', authController.handleLogout);

module.exports = router;
