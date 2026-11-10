require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
const mongoose = require("mongoose");




//MIDDLEWARES
const { notFound, errorHandler } = require("./middlewares/error.middleware");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser());


//routes
const apiRouter = express.Router();
const authRoutes = require("./routes/auth.routes.js");

app.use("/api", apiRouter);

apiRouter.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
});





apiRouter.use("/auth", authRoutes);



//ERROR HANDLING MIDDLEWARES
app.use(notFound);
app.use(errorHandler);

async function connectDB() {
  await mongoose.connect("mongodb+srv://abdaltwabsayed89_db_user:xpri1GWTDir5hLDT@stockly.7hhitwd.mongodb.net/");
  console.log("connected to db successfuly on port 27017");
}
 
connectDB();
 
 
 
//STARTING SERVER

async function startServer() {
    try {
        const { connectDB } = require("./config/db.config");
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.log("Cannot Connect to DB");
        throw new Error(err.message);
    }
}

startServer();