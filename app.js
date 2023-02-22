const express = require('express');

const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')

//route
const userRoute = require("./routes/userRoute");
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');

const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use('/api/v1',productRoute);
app.use('/api/v1',userRoute);
app.use('/api/v1',orderRoute);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;