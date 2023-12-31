const mongoose = require("mongoose");

const { startingApp } = require("./startingApp.config");



const connectDB = (app) => {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true },)
        .then(() => {
            console.log("Connected to MongoDB successfully");
            startingApp(app);
        })
        .catch(error => console.error("Error connecting to MongoDB:", error));
};



module.exports = {
    connectDB
};