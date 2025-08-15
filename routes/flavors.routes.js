const express = require('express');
const router = express.Router();
const flavorsController = require('../controllers/flavors.controller');

// Ruta para obtener todos los sabores
router.get('/', flavorsController.getFlavors);

// Ruta para obtener un solo sabor por ID
router.get('/:id', flavorsController.getFlavor);

// Ruta para crear un nuevo sabor
router.post('/', flavorsController.createFlavor);

// Ruta para actualizar un sabor por ID (Método PUT)
router.put('/:id', flavorsController.updateFlavor);

// Ruta para eliminar un sabor por ID (Método DELETE)
router.delete('/:id', flavorsController.deleteFlavor);

module.exports = router;