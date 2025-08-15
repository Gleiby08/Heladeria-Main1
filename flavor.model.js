const mongoose = require('mongoose');

const flavorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio.'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria.'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio.']
    },
    tags: {
        type: [String],
        default: []
    },
    type: {
        type: String,
        enum: ['crema', 'chocolate', 'fruta', 'especial'],
        required: [true, 'El tipo es obligatorio.']
    },
    image: {
        type: String,
        required: [true, 'La URL de la imagen es obligatoria.']
    }
});

// Esta es la parte crucial que soluciona el problema
flavorSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Flavor', flavorSchema);

