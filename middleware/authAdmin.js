// middleware/authAdmin.js

const isAuthenticated = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  }
  // Si no está autenticado, redirige a la página de login
  res.redirect('/auth/login');
};

module.exports = { isAuthenticated };
