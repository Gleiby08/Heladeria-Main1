const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Corregido: 'user' en singular
const { JWT_SECRET } = require('../config');

const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization');
  let token = '';

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7);
  }

  if (!token) {
    return response.status(401).json({ error: 'token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token malformed' });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(401).json({ error: 'token invalid, user not found' });
    }

    request.user = user; // Adjunta el objeto de usuario completo
    next();
  } catch (error) {
    return response.status(401).json({ error: 'token invalid' });
  }
};

const adminRequired = (request, response, next) => {
  if (!request.user || request.user.role !== 'admin') {
    return response.status(403).json({ error: 'admin privileges required' });
  }
  next();
};

module.exports = { userExtractor, adminRequired };