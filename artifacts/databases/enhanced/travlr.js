const mongoose = require('mongoose');

// ====== Schema Definition ======
const tripSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Trip code is required'],
    index: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Trip name is required'],
    index: true,
    trim: true
  },
  length: {
    type: Number,
    required: [true, 'Trip length is required'],
    min: [1, 'Trip length must be at least 1 day']
  },
  start: {
    type: Date,
    required: [true, 'Start date is required']
  },
  resort: {
    type: String,
    required: [true, 'Resort name is required'],
    trim: true
  },
  perPerson: {
    type: Number,
    required: [true, 'Price per person is required'],
    min: [0, 'Price must be a positive number']
  },
  image: {
    type: String,
    required: [true, 'Image path is required'],
    trim: true,
    default: 'default-trip.jpg' // Optional default image
  },
  description: {
    type: String,
    required: [true, 'Trip description is required'],
    trim: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// ====== Mongoose Model Export ======
const Trip = mongoose.model('trips', tripSchema);
module.exports = Trip;
