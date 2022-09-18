const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const url = 'mongodb://localhost:27017'
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB