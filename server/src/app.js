require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();




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