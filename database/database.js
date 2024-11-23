const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
    try {
        const connectionString = process.env.MONGO_URI;
        if (!connectionString) {
            throw new Error("MONGO_URI is not defined in the environment variables.");
        }

        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        await mongoose.connect(connectionString, options);

        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Error connecting to database:", error.message);
        process.exit(1); 
    }
};

module.exports = connectToDatabase;
