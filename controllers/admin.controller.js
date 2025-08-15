// controllers/admin.controller.js
const Flavor = require('../flavor.model');

// Muestra la lista de todos los sabores (Dashboard)
exports.listFlavors = async (req, res) => {
  try {
    const flavors = await Flavor.find({});
    res.render('admin/dashboard', { flavors });
  } catch (error) {
    res.status(500).send("Error al obtener los sabores");
  }
};

// Muestra el formulario para crear un nuevo sabor
exports.showCreateForm = (req, res) => {
  res.render('admin/create');
};

// Procesa la creación de un nuevo sabor
exports.createFlavor = async (req, res) => {
  try {
    const newFlavor = new Flavor(req.body);
    await newFlavor.save();
    res.redirect('/admin/sabores');
  } catch (error) {
    res.status(500).send("Error al crear el sabor");
  }
};

// Muestra el formulario para editar un sabor
exports.showEditForm = async (req, res) => {
  try {
    const flavor = await Flavor.findById(req.params.id);
    if (!flavor) return res.status(404).send('Sabor no encontrado');
    res.render('admin/edit', { flavor });
  } catch (error) {
    res.status(500).send("Error al obtener el sabor");
  }
};

// Procesa la actualización de un sabor
exports.updateFlavor = async (req, res) => {
  try {
    await Flavor.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/admin/sabores');
  } catch (error) {
    res.status(500).send("Error al actualizar el sabor");
  }
};

// Procesa la eliminación de un sabor
exports.deleteFlavor = async (req, res) => {
  try {
    await Flavor.findByIdAndDelete(req.params.id);
    res.redirect('/admin/sabores');
  } catch (error) {
    res.status(500).send("Error al eliminar el sabor");
  }
};
