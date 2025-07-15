
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 5 },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    enrolled: { type: Boolean, default: true }
});

module.exports = mongoose.model('Student', studentSchema);
