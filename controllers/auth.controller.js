// controllers/auth.controller.js
const User = require('../user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Procesa el registro de un nuevo usuario
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validar que los datos llegaron
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        // 2. Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
        }

        // 3. Crear el nuevo usuario (la contraseña se hashea en el pre-save hook del modelo)
        const newUser = new User({ name, email, password });
        await newUser.save();

        // 4. Enviar respuesta exitosa
        res.status(201).json({ message: 'Usuario registrado con éxito.' });

    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error en el servidor al registrar el usuario.' });
    }
};

// Procesa el inicio de sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

// 1. Validar que los datos llegaron
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
        }

        // 2. Buscar al usuario y traer la contraseña
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' }); // Mensaje genérico por seguridad
        }

        // 3. Comparar la contraseña ingresada con la almacenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        // 4. Crear un token JWT
        const payload = { id: user._id, name: user.name };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h' // El token expira en 1 hora
        });

        // 5. Enviar el token al cliente
        res.status(200).json({ message: 'Inicio de sesión exitoso.', token });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error en el servidor al iniciar sesión.' });
    }
};

// Crea un usuario invitado anónimo
exports.createGuest = async (req, res) => {
    try {
        // 1. Crear un nuevo usuario invitado
        // Nota: El siguiente paso (3) es crucial para que esto funcione.
        const guestUser = new User({
            name: `Invitado-${Date.now()}`,
            isGuest: true
        });
        await guestUser.save();

        // 2. Crear un token JWT para el invitado
        const payload = { id: guestUser._id, name: guestUser.name, isGuest: true };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        // 3. Enviar el token al cliente
        res.status(201).json({ message: 'Usuario invitado creado.', token });
    } catch (error) {
        console.error('Error al crear usuario invitado:', error);
        res.status(500).json({ message: 'Error en el servidor al crear el invitado.' });
    }
};
