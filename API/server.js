const express = require('express');
const app = express();
const dbPool=require('./dbModel/DatabaseModel');
const session = require('express-session');
const cors=require("cors");
const { json } = require('express');
require('dotenv').config();
const port = process.env.PORT || 3000;
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }))
app.use(cors());
app.use(express.json());

dbPool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log("Connected to database Connid:"+connection.threadId);

})
app.get('/',(req,res)=>{
  dbPool.query('SELECT * FROM felhasznalok',(err,results)=>{
    if (err)throw err;
    res.send(results);
  })
})

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}...`);
});