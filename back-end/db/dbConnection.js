require('dotenv').config();  // Add this at the top to load environment variables

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;  // Fetch MongoDB URI from environment variables
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Unable to connect to Database!', error.message);
        console.error(error.stack);  // Include stack trace for debugging
    }
};

module.exports = connectDB;
