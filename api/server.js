require('dotenv').config()
const express = require("express");
const app = require('./src/app');

app.use(express.json());

const PORT = process.env.APP_PORT || 8080;

app.listen(PORT, () => {
    console.log(`Started server on the PORT::${PORT}`);
})