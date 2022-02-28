const express = require('express');
const router = require('./Routes/Router.js');
const app = express();
const session = require('express-session');
const cors=require("cors");
require('dotenv').config();


const port = process.env.PORT || 3000;
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }))

app.use(cors());
app.use(express.json());
//app.use('/', router);

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}...`);
});
