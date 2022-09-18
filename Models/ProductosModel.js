const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    thumbnail: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Products', productSchema)