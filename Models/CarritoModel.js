const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    products: {
        type: Array,
    }
});

module.exports = mongoose.model('Carts', cartSchema)