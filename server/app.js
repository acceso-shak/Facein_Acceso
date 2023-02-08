const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const {matchFace} = require("./utils");

dotenv.config({ path: './config.env' });
require('./db/conn');
const User = require('./model/userSchema');

//Security
app.use(cors())
const PORT = process.env.PORT;


//middeleware 
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));


//link router mile2
app.use(require('./router/auth'));


const middeleware = (req, res, next) => {
    console.log('hello middeleware');
    next();
}


app.get('/', (req, res) => {
    res.cookie("test",'shivam');
    res.send('hello shivam');

});


app.get('/about', middeleware, (req, res) => {
    res.send('About shivam');
});


app.get('/contact', (req, res) => {
    res.send('Connect shivam');
});


app.get('/login', (req, res) => {
    res.send('Login shivam');
});

app.get('/signup', (req, res) => {
    res.send('Singup shivam');
});

app.post("/compare", async (req, res) => {
    const {username, face} = req.body;
    // compareFaces function  ka use internally karna
    // ye route ko hata dena
    // cause else security ka issue hoga
    res.send(await matchFace(username,face));
})


app.listen(PORT, () => {
    console.log(`server running on ${PORT} PORT`);
});



