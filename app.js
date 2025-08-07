const express = require('express');
const path = require('path');

// Importar las rutas que ya creamos
const flavorsRoutes = require('./routes/flavors.routes');

// Crear la aplicación de Express
const app = express();

// --- Middlewares ---
app.use(express.json()); // Para poder recibir y enviar JSON
app.use(express.urlencoded({ extended: true })); // Para formularios
app.use(express.static(path.join(__dirname, 'public'))); // Para servir los archivos HTML, CSS y JS del frontend

// --- Rutas de la API ---
app.use('/api/flavors', flavorsRoutes);

// Exportamos la app para que index.js pueda usarla
module.exports = app;