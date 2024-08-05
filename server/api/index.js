const dotenv  = require('dotenv');
const app  = require('./app')
const connectDB  = require('./db/index')

// Configure dotenv for local development environment variables
dotenv.config();

// Define the port to run the application
const PORT = process.env.PORT || 8080;

// Database connection 
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});