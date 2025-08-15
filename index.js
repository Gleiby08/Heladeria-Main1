const app = require('./app');
const http = require('http');
const mongoose = require('mongoose');
const { PORT, MONGO_URI } = require('./config');

const server = http.createServer(app);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ ¡Conexión a MongoDB exitosa!');
        // Iniciar el servidor SOLO si la conexión a la BD es exitosa
        server.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Error al conectar a MongoDB:', err.message);
        process.exit(1);
    });
