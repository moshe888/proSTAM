const express = require('express');
const mongoose = require('mongoose');
const homeRoute = require('./routes/home');
const storeRoute = require('./routes/store');
const authorsRoute = require('./routes/stores');

const http = require("http");
const path = require("path");
const cors = require("cors");

const aboutRoute = require('./routes/about');
const managementRouter = require('./routes/management');
const productsRouter = require('./routes/prodacts');


const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.set('views', './views');
mongoose.connect('mongodb://localhost:27017/STAM', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(error.message));

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoute);
app.use('/stores', storeRoute);
app.use('/authors', authorsRoute);
app.use('/about', aboutRoute);
app.use('/stores', managementRouter);
app.use('/products', productsRouter);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
