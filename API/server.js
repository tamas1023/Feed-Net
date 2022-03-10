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
app.post('/login', (req, res) => {
  let data = {
      email: req.body.Email,
      pass: req.body.passwd,
  }
  dbPool.query(`SELECT * FROM felhasznalok WHERE Email='${data.email}' AND jelszo='${data.pass}'`, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

app.post('/selectCustom', (req, res) => {
  let data = {
    tablename: req.body.Tablename,
    select:req.body.Select
  }
  dbPool.query(`SELECT * FROM ${data.tablename} WHERE  ${data.select}`, (err, results) => {
      if (err) throw err;
      
      res.json(results);
  });
});

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}...`);
});
