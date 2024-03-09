const express = require('express');
const app = express();
const mongoose = require("mongoose");
const {userRouter} = require("./routes/user_routes");
const {profileRouter} = require("./routes/profile_routes");
const methodOverride = require('method-override');
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use('/v1/user', userRouter);
app.use('/v1/profile', profileRouter);
app.use(methodOverride('_method'));
app.use(cors({
    origin: '*',
}));
MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("successfully connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to database: ", error)
    })


module.exports = app
