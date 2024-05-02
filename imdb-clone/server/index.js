require("dotenv").config();
const express = require("express");
const { db } = require("./db/connect");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const movieRoutes = require("./routes/movie.routes");
const actorRoutes = require("./routes/actor.routes");
const producerRoutes = require("./routes/producer.routes");
const cors = require("cors");
const app = express();

db();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(function (req, res, next){
    res.header("Allow-Control-Allow-Origin", "http://localhost:5001");
    res.header(
        "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(authRoutes);
app.use(producerRoutes);
app.use(actorRoutes);
app.use(movieRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("App is running on PORT : ", PORT);
});