require('dotenv').config();

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('Error: MONGO_URI no está definida en las variables de entorno');
  process.exit(1);
}

module.exports = { MONGO_URI, PORT };
