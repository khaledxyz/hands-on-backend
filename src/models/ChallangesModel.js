const mongoose = require('mongoose');

const challengesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: [String],
        required: true
    },

}, { timestamps: true });

module.exports = new mongoose.model('Challenges', challengesSchema);
