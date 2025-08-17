const mongoose = require('mongoose');

// ====== Schema Definition ======
// Defines the shape of a Trip document in MongoDB
const tripSchema = new mongoose.Schema({
  code: { type: String, required: true, index: true },       // Unique trip code (indexed for faster search)
  name: { type: String, required: true, index: true },       // Trip name (also indexed)
  length: { type: String, required: true },                  // Trip duration (will be changed to Number)
  start: { type: Date, required: true },                     // Start date of the trip
  resort: { type: String, required: true },                  // Resort name or location
  perPerson: { type: String, required: true },               // Price per person (should be numeric)
  image: { type: String, required: true },                   // Image URL or filename
  description: { type: String, required: true }              // Trip description
});

// ====== Mongoose Model Export ======
// Connects schema to 'trips' collection in MongoDB
const Trip = mongoose.model('trips', tripSchema);
module.exports = Trip;
