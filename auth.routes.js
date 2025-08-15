const router = require('express').Router();
const authController = require('./controllers/auth.controller');

// Ruta para registrar un nuevo usuario
router.post('/register', authController.register);

// Ruta para iniciar sesión
router.post('/login', authController.login);

// Ruta para crear un usuario invitado
router.post('/guest', authController.createGuest);

module.exports = router;
