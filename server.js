const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Importar las rutas que ya creamos
const flavorsRoutes = require('./routes/flavors.routes');
const authRoutes = require('./auth.routes'); // <-- CORRECCIÓN: Usar el router de API correcto

// Crear la aplicación de Express
const app = express();
const PORT = process.env.PORT || 3001;

// --- Middlewares ---
app.use(express.json()); // Para poder recibir y enviar JSON
app.use(express.urlencoded({ extended: true })); // Para formularios
app.use(express.static(path.join(__dirname, 'public'))); // Para servir los archivos HTML, CSS y JS del frontend

// --- Conexión a la Base de Datos ---
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("Error: No se encontró la variable de entorno MONGODB_URI en el archivo .env");
    process.exit(1); // Detiene la aplicación si no hay URI
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ ¡Conexión a MongoDB exitosa!');
        // Iniciar el servidor SOLO si la conexión a la BD es exitosa
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Error al conectar a MongoDB:', err.message);
        process.exit(1);
    });

// --- Rutas de la API ---
app.use('/api/flavors', flavorsRoutes);
app.use('/api/auth', authRoutes);
