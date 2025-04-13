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

module.exports = {
    tripsList,
    tripsFindByCode
};
