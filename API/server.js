const express = require('express');
const app = express();
const router=require('./Routes/router.js');
const dbPool=require('./dbModel/DatabaseModel');
const session = require('express-session');
const cors=require("cors");
const { json } = require('express');
require('dotenv').config();
var jog="";
const port = process.env.PORT || 3000;
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }))
app.use(cors());
app.use(express.json());
//app.use('/',router);

dbPool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log("Connected to database Connid:"+connection.threadId);

})
app.get('/',(req,res)=>{
  if(session.Rights="admin")
  {
    dbPool.query('SELECT * FROM felhasznalok',(err,results)=>{
      if (err)throw err;
      res.send(results);
     // console.log(jog);
    });
  }
});
app.get('/logout',(req,res)=>{
    session.Rights="user";
    session.LoggedIn=false;
    console.log(session.Rights);
})
app.post('/login', (req, res) => {
  let data = {
      email: req.body.Email,
      pass: req.body.passwd,
  }
  dbPool.query(`SELECT * FROM felhasznalok WHERE Email='${data.email}' AND jelszo='${data.pass}'`, (err, results) => {
      if (err) throw err;
      res.json(results);
      //console.log(results[0].Jog);
      if(results.length>0)
      {
        session.Rights=results[0].Jog;
        session.LoggedIn=true;
        jog=results[0].Jog;
      }
      console.log(session.Rights);
  });
});

// check if email already exists

app.get('/emailcheck',(req,res)=>{
  let data = {
    email: req.body.Email,
  }
  let Email=req.body.Email;
  console.log(Email);
  //let email=req.body.Email;
  //console.log(email);
  dbPool.query(`SELECT * FROM felhasznalok WHERE Email='${data.email}'`, (err, results) => {
    if (err) throw err;
    res.json(results);
});
})

//registration

app.post('/reg', (req, res) => {
  let data = {
      email: req.body.Email,
      pass: req.body.passwd,
  }
  dbPool.query(`INSERT INTO felhasznalok VALUES(null,)`, (err, results) => {
      if (err) throw err;
      res.json(results);
      //console.log(results[0].Jog);

  });
});



app.listen(port, ()=>{
    console.log(`Server listening on port ${port}...`);
});
