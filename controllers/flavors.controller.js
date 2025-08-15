// controllers/flavors.controller.js
const Flavor = require('../flavor.model');

// Lógica para obtener todos los sabores
const getFlavors = async (req, res) => {
  try {
    const flavors = await Flavor.find({});
    res.json(flavors);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los sabores', error: error.message });
  }
};

// Lógica para obtener un solo sabor por ID
const getFlavor = async (req, res) => {
  try {
    const flavor = await Flavor.findById(req.params.id);
    if (!flavor) {
      return res.status(404).json({ message: 'Sabor no encontrado' });
    }
    res.json(flavor);
  } catch (error) {
    // Check for CastError (invalid ObjectId format)
    if (error.name === 'CastError') {
      return res.status(400).json({ message: `El ID de sabor proporcionado no es válido.` });
    }
    // For other types of errors, it's a server error
    res.status(500).json({ message: 'Error interno del servidor al obtener el sabor', error: error.message });
  }
};

// Lógica para crear un nuevo sabor
const createFlavor = async (req, res) => {
  try {
    const newFlavor = new Flavor(req.body);
    const savedFlavor = await newFlavor.save();
    res.status(201).json(savedFlavor);
  } catch (error) {
    // Check if it's a Mongoose validation error
    if (error.name === 'ValidationError') {
      // Extract validation messages
      const errors = Object.values(error.errors).map(err => err.message);
      // Join messages and send a more specific error
      return res.status(400).json({ message: `Error de validación: ${errors.join(', ')}` });
    }
    // For other types of errors
    res.status(400).json({ message: 'Error al crear el sabor', error: error.message });
  }
};

// Lógica para actualizar un sabor por ID
const updateFlavor = async (req, res) => {
  try {
    const updatedFlavor = await Flavor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedFlavor) {
      return res.status(404).json({ message: 'Sabor no encontrado para actualizar' });
    }
    res.json(updatedFlavor);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: `Error de validación: ${errors.join(', ')}` });
    }
    // Check for CastError (invalid ObjectId format)
    if (error.name === 'CastError') {
      return res.status(400).json({ message: `El ID de sabor proporcionado no es válido.` });
    }
    // For other types of errors, it's a server error
    res.status(500).json({ message: 'Error interno del servidor al actualizar el sabor', error: error.message });
  }
};

// Lógica para eliminar un sabor por ID
const deleteFlavor = async (req, res) => {
  try {
    const deletedFlavor = await Flavor.findByIdAndDelete(req.params.id);
    if (!deletedFlavor) {
      return res.status(404).json({ message: 'Sabor no encontrado para eliminar' });
    }
    res.status(204).send();
  } catch (error) {
    // Check for CastError (invalid ObjectId format)
    if (error.name === 'CastError') {
      return res.status(400).json({ message: `El ID de sabor proporcionado no es válido.` });
    }
    res.status(500).json({ message: 'Error interno del servidor al eliminar el sabor', error: error.message });
  }
};

// LA SOLUCIÓN: Exportar un objeto con todas las funciones controladoras.
module.exports = {getFlavors,getFlavor,createFlavor,updateFlavor,deleteFlavor,};