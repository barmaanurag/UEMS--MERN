const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://anurag:12345@cluster0.lmsdx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Unable to Connect to Database!', error.message);
    }
};

module.exports = connectDB;
