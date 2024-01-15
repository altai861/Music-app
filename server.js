require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logger.js");

const app = express();
app.use(cookieParser());
const port = 3500;

const allowedOrigins = ['http://localhost:5173', 'https://altai861.github.io', 'http://localhost:3500'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}

app.use(cors(corsOptions));

app.use(logger)
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")))

app.use("/", require("./routes/root.js"));
app.use("/auth", require("./routes/authRoutes.js"));
app.use("/song", require("./routes/songsRoutes.js"));

mongoose.connect(process.env.MONGO_URI).then(async () => {

    //await uploadFile('./public/starboy.mp3', 'starboy2.mp3');
    app.listen(port, function () {
        console.log(`Server is running on port ${port}`);
    })
})
.catch((error) => console.log(`${error} did not connect`));