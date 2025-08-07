// controllers/auth.controller.js
const { ADMIN_USERNAME, ADMIN_PASSWORD } = require('../config');

// Muestra la página de login del administrador
exports.showLoginPage = (req, res) => {
  res.render('auth/login', { error: null });
};

// Procesa el formulario de login
exports.handleLogin = (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Credenciales correctas, se crea la sesión
    req.session.isAdmin = true;
    res.redirect('/admin/sabores');
  } else {
    // Credenciales incorrectas
    res.render('auth/login', { error: 'Usuario o contraseña incorrectos' });
  }
};

// Cierra la sesión del administrador
exports.handleLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/admin/sabores');
    }
    res.redirect('/auth/login');
  });
};
