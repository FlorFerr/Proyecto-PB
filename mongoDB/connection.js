const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const url = 'mongodb+srv://FlorF:Flor2022>@cluster0.uawt05w.mongodb.net/test'
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected')
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB
