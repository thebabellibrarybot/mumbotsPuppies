const express = require('express');
const { ServerApiVersion } = require('mongodb');
require('dotenv').config();

// required routes
const searchTombsRoute = require('./src/routes/searchTombsRoute');
//const updateSearchRoute = require('./src/routes/updateSearchRoute');

// setup-template
const mongoose = require('mongoose');
const app = express();
const Port = process.env.PORT || 5000
console.log(Port, 'port')

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
// expres w/o custom hook
app.use(express.json());
// logger
app.use((req, res, next) => {
    console.log(req.path, req.method, req.body, 'server msg from port')
    next()
});


// mongoDB conn
const uri = process.env.MONGO_URI  
mongoose.set('strictQuery', false);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('md conn')
}) 


// routes
app.use('/searchmorgan', searchTombsRoute);

// update routes
//app.use('/updatesearch', updateSearchRoute);

 
// port and clear run statements;
app.listen(Port, () => {
    console.log(`listening on ${Port}`)
});