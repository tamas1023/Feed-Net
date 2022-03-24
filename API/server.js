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
app.get("/email",(req,res)=>{
  if(session.Rights=="admin"||session.Rights=="user"||session.Rights=="etterem")
  {
    res.send(session.Email);
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
    session.Email="";
    req.session.destroy();

    res.json({message:"ok"});
   // console.log(session.LoggedIn);
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
      if(results.length>0&&results[0].Statusz==1)
      {
        sesssion=req.session
        session.Rights=results[0].Jog;
        session.LoggedIn=true;
        session.Email=results[0].Email;
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
  if(session.Rights=="admin")
  {
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
  }
  else
  {
    res.json({message:"Nem kérheted ezeket le"});
  }
})

  //admin étterem felvétel

app.post('/admindininginsert',(req,res)=>{
  if(session.Rights=="admin")
  {
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
    dbPool.query(`INSERT INTO ettermek VALUES (NULL,'${data.email}','${data.nev}','${data.telefon}',${data.parkolo},${data.bankkartya},${data.glutenmentes},${data.terasz},${data.berelheto},'${data.cim}',${data.ferohely},${data.hazhozszallitas},'${data.leiras}',${data.statusz},'')`,(err,results)=>{
      if(err)throw err;
      res.json(results);
      //console.log('sikeres felvétel');
    });
    let passwd="ef32600aaedc13042de3712a8c2c1286671c1f37";
    dbPool.query(`SELECT * FROM felhasznalok WHERE Email='${data.email}'`,(err,results)=>{
      if(err)throw err;
      if(results.length==0)
      {
        dbPool.query(`INSERT INTO felhasznalok VALUES (NULL, '${data.email}', '${data.nev}', '${passwd}', NULL, CURRENT_TIME, NULL, '1', 'etterem');`,(err,r)=>{
          if(err)throw err;
         // console.log('sikeres insert');
         // res.send("ok");
        })
      }
    })
    
  }
  else
  {
    res.json({message:"Nem kérheted ezeket le"});
  }
})

  //admin étlap select

app.post('/adminfoodselect',(req,res)=>{
  if(session.Rights=="admin")
  {
    let data = {
      ID:req.body.id
    }
    dbPool.query(`SELECT * FROM etlap WHERE Etterem_ID=${data.ID}`,(err,results)=>{
      if(err)throw err;
      res.json(results);
    })
  }
  else
  {
    res.json({message:"Nem kérheted ezeket le"});
  }
})

  //admin étlap delete

app.post('/adminfooddelete',(req,res)=>{
  if(session.Rights=="admin")
  {
    dbPool.query(`DELETE FROM etlap WHERE ID=${req.body.id}`,(err,results)=>{
      if(err)throw err;
      res.json({message:"törlve lett"});
    })
  }
  else
  {
    res.json({message:"Nem kérheted ezeket le"});
  }
})

  //admin étlap felvétel

app.post('/adminfoodinsert',(req,res)=>{
  if(session.Rights=="admin")
  {
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
  }
  else
  {
    res.json({message:"Nem kérheted ezeket le"});
  }
})

  //admin étlap módosítás

app.post('/adminfoodupdate',(req,res)=>{
  if(session.Rights=="admin")
  {
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
  }
  else
  {
    res.json({message:"Nem kérheted ezeket le"});
  }
})

  //admin felhasználók 

  //admin felhasználók select

app.get("/userselect",(req,res)=>{
  if(session.Rights=="admin")
  {
    dbPool.query('SELECT * FROM felhasznalok',(err,results)=>{
      if(err)throw err;
      res.json(results);
    });
  }
  else
  {
    res.json({message:"Nem kérheted ezeket le"});
  }
})

  //admin felhasználó insert

  app.post('/userinsert',(req,res)=>{
    if(session.Rights=="admin")
    {
      let data = {
        id:req.body.ID,
        email: req.body.Email,
        name:req.body.Name,
        telefon:req.body.Telefon,
        pass: req.body.passwd,
        jog:req.body.Jog,
        statusz:req.body.Statusz
    }
      dbPool.query(`INSERT INTO felhasznalok VALUES(NULL,'${data.email}','${data.name}','${data.pass}','${data.telefon}',CURRENT_TIME,NULL,${data.statusz},'${data.jog}');`,(err,results)=>{
        if(err)throw err;
        res.json({message:"ok"});
      })
    }
    else
    {
      res.json({message:"Nem kérheted ezeket le"});
    }
  })

  //admin felhasználók update

app.post('/userupdate',(req,res)=>{
  if(session.Rights=="admin")
  {
    let data = {
      id:req.body.ID,
      email: req.body.Email,
      name:req.body.Name,
      telefon:req.body.Telefon,
      pass: req.body.passwd,
      jog:req.body.Jog,
      statusz:req.body.Statusz
  }
    dbPool.query(`UPDATE felhasznalok SET Email='${data.email}',Nev='${data.name}',Jelszo='${data.pass}',Telefon='${data.telefon}',Statusz=${data.statusz},Jog='${data.jog}' WHERE ID=${data.id};`,(err,results)=>{
      if(err)throw err;
      res.json({message:"ok"});
    })
  }
  else
  {
    res.json({message:"Nem kérheted ezeket le"});
  }
})

  //admin felhasználók delete

app.post('/userdelete',(req,res)=>{
  if(session.Rights=="admin")
  {
    dbPool.query(`DELETE FROM felhasznalok WHERE ID=${req.body.ID}`,(err,results)=>{
      if(err)throw err;
      res.json({message:"ok"});
    })
  }
  else
  {
    res.json({message:"Nem kérheted ezeket le"});
  }
})

  //admin hibajelentés select
  
  app.get('/errorselect',(req,res)=>{
    if(session.Rights=="admin")
    {
      dbPool.query(`SELECT hibajelentes.ID,ettermek.Nev as EtNev,felhasznalok.Nev,hibajelentes.Tipus,hibajelentes.Leiras FROM hibajelentes,ettermek,felhasznalok WHERE Etterem_ID=ettermek.ID AND felhasznalok.ID=Felhasznalo_ID `,(err,results)=>{
        if(err)throw err;
        res.json(results);
      })
    }
    else
    {
      res.json({message:"Nem kérheted ezeket le"});
    }
  })

    //admin hibajelentés delete

app.post('/errordelete',(req,res)=>{
  if(session.Rights=="admin")
  {
    dbPool.query(`DELETE FROM hibajelentes WHERE ID=${req.body.ID}`,(err,results)=>{
      if(err)throw err;
      res.json({message:"ok"});
    })
  }
  else
  {
    res.json({message:"Nem kérheted ezeket le"});
  }
})

  //étterem is meghatározása
app.post('/etteremid',(req,res)=>{
  if(session.Rights=="etterem")
  {
    dbPool.query(`SELECT ettermek.ID FROM felhasznalok,ettermek WHERE felhasznalok.Email=ettermek.Email AND ettermek.Email="${req.body.Email}"`,(err,results)=>{
      if(err)throw err;
      res.json(results);
    });
  }
})

  //etterem rendelések select

app.post("/etteremselect",(req,res)=>{
  if(session.Rights=="etterem")
  {
                  //SELECT helyfoglalas.ID,helyfoglalas.Fo,CONVERT_TZ(helyfoglalas.Kezdes,'+00:00','+01:00') as Kezdes,felhasznalok.Nev FROM helyfoglalas,felhasznalok WHERE felhasznalok.ID=helyfoglalas.Felhasznalo_ID AND Etterem_ID=1
                  //SELECT helyfoglalas.ID,helyfoglalas.Fo,helyfoglalas.Kezdes,felhasznalok.Nev FROM helyfoglalas,felhasznalok WHERE felhasznalok.ID=helyfoglalas.Felhasznalo_ID AND Etterem_ID=${req.body.EtteremID}
    dbPool.query(`SELECT helyfoglalas.ID,helyfoglalas.Fo,helyfoglalas.Kezdes,felhasznalok.Nev,CURRENT_TIMESTAMP AS ido FROM helyfoglalas,felhasznalok WHERE felhasznalok.ID=helyfoglalas.Felhasznalo_ID AND Etterem_ID=${req.body.EtteremID} ORDER BY helyfoglalas.Kezdes DESC`,(err,results)=>{
      if(err)throw err;
      res.json(results);
      //console.log(results);
    })
  }
  else
  {
    res.json({message:"Nem kérheted ezeket le"});
  }
})

//etterem rendelések delete

app.post("/etteremdelete",(req,res)=>{
  if(session.Rights=="etterem")
  {
    dbPool.query(`DELETE FROM helyfoglalas WHERE ID=${req.body.ID}`,(err,results)=>{
      if(err)throw err;
        res.json({message:"ok"});
    })
  }
  else
  {
    res.json({message:"Nem kérheted ezeket le"});
  }
})

  //étterem módosítás

app.post("/etteremupdate",(req,res)=>{
  if(session.Rights=="etterem")
  {
    dbPool.query(`UPDATE helyfoglalas SET Kezdes='${req.body.Kezdes}',Fo=${req.body.Fo} WHERE helyfoglalas.ID=${req.body.ID}`,(err,results)=>{
      if(err)throw err;
        res.json({message:"ok"});
    })
  }
  else
  {
    res.json({message:"Nem kérheted ezeket le"});
  }
})

  //étterem férőhelyének lekérése

app.post('/etteremfo',(req,res)=>{
  if(session.Rights=="etterem")
  {
    //console.log(req.body.ID);
    dbPool.query(`SELECT Ferohely FROM ettermek WHERE ID=${req.body.ID} `,(err,results)=>{
      if(err)throw err;
      res.json(results);
     // console.log(results);
    })
  }
  else
  {
    res.json({message:"Nem kérheted ezeket le"});
  }
});

  //étterem helyet foglaltak száma

app.post('/etteremminus',(req,res)=>{
  if(session.Rights=="etterem")
  {

    dbPool.query(`SELECT SUM( helyfoglalas.Fo) AS Fo FROM helyfoglalas,ettermek WHERE CURRENT_TIMESTAMP<helyfoglalas.Kezdes AND ettermek.ID=${req.body.ID} AND helyfoglalas.Etterem_ID=${req.body.ID} `,(err,results)=>{
      if(err)throw err;
      res.json(results);
    })
  }
  else
  {
    res.json({message:"Nem kérheted ezeket le"});
  }
})

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
