const express = require('express');
const app = express();
const dbPool=require('./dbModel/DatabaseModel');
const session = require('express-session');
const cors=require("cors");
const { json } = require('express');
const { Session } = require('express-session');
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
app.post('/session',(req,res)=>{
  if(session.Rights=="admin"||session.Rights=="user"||session.Rights=="etterem")
  {
    res.send(session.Rights);
  }
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

    //Log out

app.get('/logout',(req,res)=>{
    session.Rights="";
    session.LoggedIn=false;
    req.session.destroy();

    res.json({message:"ok"});
    console.log(session.LoggedIn);
})

    //login

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
        sesssion=req.session
        session.Rights=results[0].Jog;
        session.LoggedIn=true;
        jog=results[0].Jog;
      }
      //console.log(session.LoggedIn);
  });

    //belépési dátum
  dbPool.query(`UPDATE felhasznalok SET Belepes=CURRENT_TIME WHERE Email='${data.email}'`,(err,resluts)=>{
    if(err)throw err;
    //console.log('sikeres dátum frissítés');
  })
});

  //registration

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
      table: req.body.Table,
      email: req.body.Email,
    }

    //console.log(Email);
    //let email=req.body.Email;
    //console.log(email);
    dbPool.query(`SELECT * FROM ${data.table} WHERE Email='${data.email}'`, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

  //admin Étterem

  //admin select
  app.get('/admindiningselect',(req,res)=>{
    if(session.Rights=="admin")
    {
      dbPool.query('SELECT * FROM ettermek',(err,results)=>{
        if(err)throw err;
        res.json(results);
      });
    }
    else
    {
      res.json({message:"Nem kérheted ezeket le"});
    }
  });
  
  //admin étterem update

app.post('/admindiningupdate',(req,res)=>{
  let data = {
    id:req.body.ID,
    nev:req.body.Nev,
    email: req.body.Email,
    telefon:req.body.Telefon,
    cim:req.body.Cim,
    ferohely:req.body.Ferohely,
    leiras:req.body.Leiras,
    parkolo:req.body.Parkolo,
    bankkartya:req.body.Bankkartya,
    glutenmentes:req.body.Glutenmentes,
    terasz:req.body.Terasz,
    berelheto:req.body.Berelheto,
    hazhozszallitas:req.body.Hazhozszallitas,
    statusz:req.body.Statusz
  }
  dbPool.query(`UPDATE ettermek SET ID=${data.id},Email='${data.email}',Nev='${data.nev}',Telefon='${data.telefon}',Parkolo=${data.parkolo},Bankkartya=${data.bankkartya},Glutenmentes=${data.glutenmentes},Terasz=${data.terasz},Berelheto=${data.berelheto},Cim='${data.cim}',Ferohely=${data.ferohely},Hazhozszallitas=${data.hazhozszallitas},Leiras='${data.leiras}',Statusz=${data.statusz} WHERE ID=${data.id}`,(err,results)=>{
    if(err)throw err;
    res.json(results);
    //console.log('sikeres módosítás');
  });
})

  //admin étterem felvétel

app.post('/admindininginsert',(req,res)=>{
    let data = {
      id:req.body.ID,
      nev:req.body.Nev,
      email: req.body.Email,
      telefon:req.body.Telefon,
      cim:req.body.Cim,
      ferohely:req.body.Ferohely,
      leiras:req.body.Leiras,
      parkolo:req.body.Parkolo,
      bankkartya:req.body.Bankkartya,
      glutenmentes:req.body.Glutenmentes,
      terasz:req.body.Terasz,
      berelheto:req.body.Berelheto,
      hazhozszallitas:req.body.Hazhozszallitas,
      statusz:req.body.Statusz
    }
    dbPool.query(`INSERT INTO ettermek VALUES (NULL,'${data.email}','${data.nev}','${data.telefon}',${data.parkolo},${data.bankkartya},${data.glutenmentes},${data.terasz},${data.berelheto},'${data.cim}',${data.ferohely},${data.hazhozszallitas},'${data.leiras}',${data.statusz})`,(err,results)=>{
      if(err)throw err;
      res.json(results);
      console.log('sikeres felvétel');
    });
})

  //admin étlap select

app.post('/adminfoodselect',(req,res)=>{
  let data = {
    ID:req.body.id
  }
  dbPool.query(`SELECT * FROM etlap WHERE Etterem_ID=${data.ID}`,(err,results)=>{
    if(err)throw err;
    res.json(results);
  })
})

  //admin étlap delete

app.post('/adminfooddelete',(req,res)=>{
  dbPool.query(`DELETE FROM etlap WHERE ID=${req.body.id}`,(err,results)=>{
    if(err)throw err;
    res.json({message:"törlve lett"});
  })
})

  //admin étlap felvétel

app.post('/adminfoodinsert',(req,res)=>{
  let data={
    etteremid:req.body.EtteremID,
    nev:req.body.Nev,
    ar:req.body.Ar,
    leiras:req.body.Leiras
  }
  dbPool.query(`INSERT INTO etlap VALUES(NULL,${data.etteremid},'${data.nev}',${data.ar},'${data.leiras}')`,(err,results)=>{
    if(err)throw err;
    res.json({message:"felvéve lett étel"});
  })
})

  //admin étlap módosítás

app.post('/adminfoodupdate',(req,res)=>{
  let data={
    id:req.body.ID,
    etteremid:req.body.EtteremID,
    nev:req.body.Nev,
    ar:req.body.Ar,
    leiras:req.body.Leiras
  }
  dbPool.query(`UPDATE etlap SET ID=${data.id}, Etterem_ID=${data.etteremid},Nev='${data.nev}',Ar=${data.ar},Leiras='${data.leiras}' WHERE ID=${data.id} AND Etterem_ID=${data.etteremid} `,(err,results)=>{
    if(err)throw err;
    res.json({message:"felvéve lett étel"});
  })
})

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}...`);
});
