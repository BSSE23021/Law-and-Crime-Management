const mongoose = require('mongoose');
const crimeSchema = new mongoose.Schema({
    criminalName: {
        type: String,
        required: true,
    },
    crimeType: {
        type: String,
        required: true,
    },
    crimeDate: {
        type: Date,
        required: true,
    },
    caseId: {
        type: String,
        required: true,
        unique: true,
    },
});
const Crime = mongoose.model('Crime', crimeSchema);
module.exports = Crime;