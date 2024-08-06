const dotenv  = require('dotenv');
const app  = require('./app')
const mongoose = require('mongoose')
// Configure dotenv for local development environment variables
dotenv.config();

// Define the port to run the application
const PORT = process.env.PORT || 3000;

// Database connection 
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });