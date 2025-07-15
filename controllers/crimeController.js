const Crime = require('./models/Crime');
// Create a new crime record
exports.createCrime = async (req, res) => {
    try {
        const crime = new Crime(req.body);
        await crime.save();
        res.status(201).json(crime);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Get all crime records
exports.getCrimes = async (req, res) => {
    try {
        const crimes = await Crime.find();
        res.status(200).json(crimes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Update a crime record
exports.updateCrime = async (req, res) => {
    try {
        const crime = await Crime.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!crime) return res.status(404).json({ message: 'Crime record not found' });
        res.status(200).json(crime);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get a crime by ID
exports.getCrimeById = async (req, res) => {
    try {
        const crime = await Crime.findById(req.params.id);
        if (!crime) return res.status(404).json({ message: 'Crime not found' });
        res.status(200).json(crime);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a crime by ID
exports.deleteCrime = async (req, res) => {
    try {
        const crime = await Crime.findByIdAndDelete(req.params.id);
        if (!crime) return res.status(404).json({ message: 'Crime not found' });
        res.status(200).json({ message: 'Crime deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
