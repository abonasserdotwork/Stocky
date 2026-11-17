const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/stockly";



const connectDB = async () => {
    try {
        const connect = await mongoose.connect(MONGO_URI);
        connect.connection.on("connected", () => {
            console.log("Connected to Database Successfully");
        });
    } catch (err) {
        console.log("Cannot Connect to Database");
        throw new Error(err.message);
    }
}


module.exports = { connectDB };