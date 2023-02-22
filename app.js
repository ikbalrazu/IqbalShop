const express = require('express');
const productRoute = require('./routes/productRoute');
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')

const userRoute = require("./routes/userRoute");

const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use('/api/v1',productRoute);
app.use('/api/v1',userRoute);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;