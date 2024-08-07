const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DATABASE_URI);
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.error(`MongoDB connection error:`, error);
        process.exit(1);
    }
};

module.exports = { connectDB };