// controllers/flavors.controller.js
const flavorsRouter = require('express').Router();
const Flavor = require('../models/flavor.model');

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
    res.status(500).json({ message: 'Error al obtener el sabor', error: error.message });
  }
};

// Lógica para crear un nuevo sabor
const createFlavor = async (req, res) => {
  try {
    const newFlavor = new Flavor(req.body);
    const savedFlavor = await newFlavor.save();
    res.status(201).json(savedFlavor);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el sabor', error: error.message });
  }
};

// Lógica para actualizar un sabor por ID
const updateFlavor = async (req, res) => {
  try {
    const updatedFlavor = await Flavor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFlavor) {
      return res.status(404).json({ message: 'Sabor no encontrado para actualizar' });
    }
    res.json(updatedFlavor);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el sabor', error: error.message });
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
    res.status(500).json({ message: 'Error al eliminar el sabor', error: error.message });
  }
};

// LA SOLUCIÓN: Exportar un objeto con todas las funciones controladoras.
module.exports = {getFlavors,getFlavor,createFlavor,updateFlavor,deleteFlavor,};