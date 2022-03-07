const express = require('express');
const app = express();
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

dbPool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log("Connected to database Connid:"+connection.threadId);

})
app.get('/',(req,res)=>{
  if(session.Rights=="admin")
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
    //console.log(session.LoggedIn);
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
      console.log(session.LoggedIn);
  });
});
app.post("/reg",(req,res)=>{
  let data = {
    email: req.body.Email,
    name:req.body.Name,
    pass: req.body.passwd,
}
dbPool.query(`INSERT INTO felhasznalok VALUES (NULL, '${data.email}', '${data.name}', '${data.pass}', NULL, CURRENT_TIME, NULL, '1', 'user');`,(err,results)=>{
  if(err)throw err;
 // console.log('sikeres insert');
  res.json({message:"ok"});
})
})

// check if email already exists

app.post('/emailcheck',(req,res)=>{
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
