const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio.'],
        trim: true
    },
    email: {
        type: String,
        // El email ya no es obligatorio para todos (invitados)
        // `sparse: true` asegura que el índice `unique` solo se aplique a los documentos que SÍ tienen un email.
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        // La contraseña ya no es obligatoria para todos (invitados)
        select: false // No se incluirá la contraseña en las consultas por defecto
    },
    isGuest: {
        type: Boolean,
        default: false
    }
});

// Hook que se ejecuta ANTES de guardar un usuario
userSchema.pre('save', async function(next) {
    // Si no hay contraseña (es un invitado) o no se ha modificado, no hagas nada.
    if (!this.isModified('password')) return next();
    // Si el campo de contraseña está vacío, tampoco hagas nada.
    if (!this.password) return next();

    // Genera el "salt" y hashea la contraseña
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);
