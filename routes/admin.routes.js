// routes/admin.routes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { isAuthenticated } = require('../middleware/authAdmin');

// Todas las rutas de admin están protegidas
router.use(isAuthenticated);

// Redirige /admin a /admin/sabores
router.get('/', (req, res) => res.redirect('/admin/sabores'));

// Rutas del CRUD para Sabores
router.get('/sabores', adminController.listFlavors);

router.get('/sabores/nuevo', adminController.showCreateForm);
router.post('/sabores/nuevo', adminController.createFlavor);

router.get('/sabores/editar/:id', adminController.showEditForm);
router.post('/sabores/editar/:id', adminController.updateFlavor);

// Usamos POST para eliminar para poder hacerlo desde un formulario simple
router.post('/sabores/eliminar/:id', adminController.deleteFlavor);

module.exports = router;
