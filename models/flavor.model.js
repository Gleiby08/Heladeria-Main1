const { Schema, model } = require('mongoose');

const flavorSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  tags: [String],
  type: {
    type: String,
    enum: ['crema', 'chocolate', 'fruta', 'exotico'],
    required: true
  },
  image: { type: String, required: true }
});

flavorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = model('Flavor', flavorSchema);