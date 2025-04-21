const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
    try {
        const q = await Model.find({}).exec(); // ✅ This returns all trips

        if (!q || q.length === 0) {
            return res.status(404).json({ message: "No trips found" });
        }

        return res.status(200).json(q);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const tripsFindByCode = async (req, res) => {
    const tripCode = req.params.tripCode;

    try {
        const trip = await Model.findOne({ code: tripCode }).exec();

        if (!trip) {
            return res.status(404).json({ message: `Trip '${tripCode}' not found` });
        }

        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// POST: /trips – Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });
  
    const q = await newTrip.save();
  
    if (!q) {
      // Database returned no data
      return res
        .status(400)
        .json({ err: 'Failed to add trip' });
    } else {
      // Return new trip
      return res
        .status(201)
        .json(q);
    }
  
    // Uncomment the following line to show results of operation
    // on the console
    // console.log(q);
  };

  // PUT: /trips/:tripCode - Updates a Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client

const tripsUpdateTrip = async (req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);
  
    try {
      const q = await Model
        .findOneAndUpdate(
          { code: req.params.tripCode },
          {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
          },
          { new: true } // return the updated document
        )
        .exec();
  
      if (!q) {
        // Database returned no data
        return res.status(400).json({ message: 'Trip not found or not updated' });
      } else {
        // Return resulting updated trip
        return res.status(201).json(q);
      }
  
      // Uncomment to debug updated trip
      // console.log(q);
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err });
    }
  };
  
  

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
