const mongoose = require("mongoose");
const { createClient } = require('redis');
require("dotenv").config();
const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.URL);
        console.log("connected to mongo successfully");
        const conn = mongoose.connection;
    } catch (error) {
        console.log(error);
    }
};
module.exports = connectToMongo;