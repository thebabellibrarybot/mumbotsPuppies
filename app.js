const express = require('express');
const cors = require('cors')
const { ServerApiVersion } = require('mongodb');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const searchMorganRoute = require('./src/controllers/pup2');

// basic vars 
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
// midleware for cookies
app.use(cookieParser());
// mongoDB conn
const uri = process.env.MONGO_URI 
mongoose.set('strictQuery', false);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('md conn')
})


// routes
app.use('/searchmorgan', searchMorganRoute);
/*
// serve static assests if in production
    // set static folder
    app.use(express.static('client/build')) 

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
*/

// port and clear run statements;
app.listen(Port, () => {
    console.log(`listening on ${Port}`)
});