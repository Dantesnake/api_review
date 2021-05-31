const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    videojuego: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Reviews', reviewSchema);
