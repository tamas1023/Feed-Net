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
    let jsontomb=[{Rights:session.Rights,ID:session.ID}]
    res.json(jsontomb);
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
        session.ID=results[0].ID;
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
  if(session.Rights=="admin"||session.Rights=="etterem")
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
  if(session.Rights=="admin"||session.Rights=="etterem")
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
  if(session.Rights=="admin"||session.Rights=="etterem")
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
  if(session.Rights=="admin"||session.Rights=="etterem")
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

//rating select
app.get('/ratingselect',(req,res)=>{
  if(session.Rights=="admin")
  {
    dbPool.query(`SELECT  ertekeles.ID,ettermek.Nev as EtNev,felhasznalok.Nev,ertekeles.Ertekeles,ertekeles.Pontszam,ertekeles.Datum FROM ertekeles,ettermek,felhasznalok WHERE Etterem_ID=ettermek.ID AND felhasznalok.ID=Felhasznalo_ID `,(err,results)=>{
      if(err)throw err;
      res.json(results);
    })
  }
  else
  {
    res.json({message:"Nem kérheted ezeket le"});
  }
})

//rating delete

app.post('/ratingdelete',(req,res)=>{
  if(session.Rights=="admin")
  {
    dbPool.query(`DELETE FROM ertekeles WHERE ID=${req.body.ID}`,(err,results)=>{
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
    dbPool.query(`SELECT helyfoglalas.ID,helyfoglalas.Fo,helyfoglalas.Kezdes,felhasznalok.Nev,CURRENT_TIMESTAMP AS ido FROM helyfoglalas,felhasznalok WHERE felhasznalok.ID=helyfoglalas.Felhasznalo_ID AND Etterem_ID=${req.body.EtteremID} ${req.body.Feltetel} ORDER BY helyfoglalas.Kezdes DESC`,(err,results)=>{
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
//Kedvencekhez adás
app.post('/FavoriteAdd', (req, res) => {
  let data = {
    tablename: req.body.Tablename,
    EtteremID:req.body.Etterem_ID,
    FelhasznaloID:req.body.Felhasznalo_ID,
  }
  dbPool.query(`INSERT INTO ${data.tablename} VALUES(NULL,${data.EtteremID},${data.FelhasznaloID}) `, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});
//Kedvencek törlés
app.post('/FavoriteDelete', (req, res) => {
  let data = {
    tablename: req.body.Tablename,
    EtteremID:req.body.Etterem_ID,
    FelhasznaloID:req.body.Felhasznalo_ID,
  }
  dbPool.query(`DELETE FROM ${data.tablename} WHERE Etterem_ID= ${data.EtteremID} AND Felhasznalo_ID= ${data.FelhasznaloID} `, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

//Milyen nap van ma
app.post('/getDate',(req,res)=>{
  
  dbPool.query('SELECT Dayofweek(CURRENT_TIMESTAMP) as Nap',(err,results)=>{
    if (err)throw err;
    res.send(results);
     
  });
  
});
//foglalás insert
app.post('/reservationInsert',(req,res)=>{
    
  let data = {
    Etterem_ID:req.body.Etterem_ID,
    Felhasznalo_ID:req.body.Felhasznalo_ID,
    Datum:req.body.Datum,
    Fo:req.body.Fo
}
  dbPool.query(`INSERT INTO helyfoglalas VALUES(NULL,${data.Felhasznalo_ID},${data.Etterem_ID},'${data.Datum}',${data.Fo})`,(err,results)=>{
    if(err) /*throw*/ console.log(err);
    res.json({message:"Felvéve!"});
  })


})

//ertekeles insert

  app.post('/ratingInsert',(req,res)=>{
    
      let data = {
        Etterem_ID:req.body.Etterem_ID,
        Felhasznalo_ID:req.body.Felhasznalo_ID,
        Pontszam:req.body.Pontszam,
        Ertekeles:req.body.Ertekeles
    }
      dbPool.query(`INSERT INTO ertekeles VALUES(NULL,${data.Etterem_ID},'${data.Felhasznalo_ID}',${data.Pontszam},'${data.Ertekeles}',CURRENT_TIME)`,(err,results)=>{
        if(err)throw console.log(err);
        res.json({message:"Felvéve!"});
      })
    
    
  })

  //ertekeles torles
app.post('/ratingDelete',(req,res)=>{
  
    dbPool.query(`DELETE FROM ertekeles WHERE ID=${req.body.ID}`,(err,results)=>{
      if(err)throw err;
      res.json({message:"ok"});
    })
})
//értékelés módosítás
app.post('/updateRating',(req,res)=>{
  
    let data = {
      tablename:req.body.Tablename,
      mitmire:req.body.Mitmire,
      hol: req.body.Hol,
      
    }
    
    dbPool.query(`UPDATE ${data.tablename} SET ${data.mitmire}, Datum=CURRENT_TIMESTAMP WHERE ${data.hol}`,(err,results)=>{
      if(err) console.log(err);
      res.json({message:"ok"});
      
    });
  
})
//probléma jelentés
app.post('/insertProblem',(req,res)=>{
  
  let data = {
    tablename:req.body.Tablename,
    felhasznaloid:req.body.Felhasznalo_ID,
    etteremid:req.body.Etterem_ID,
    tipus:req.body.Tipus,
    leiras:req.body.Leiras, 
  }
  
  dbPool.query(`INSERT INTO ${data.tablename} VALUES(NULL,${data.felhasznaloid},${data.etteremid},'${data.tipus}','${data.leiras}')`,(err,results)=>{
    if(err) console.log(err);
    res.json({message:"ok"});
    
  });

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

// egyedi lekérdezés
app.post('/selectCustom', (req, res) => {
  let data = {
    tablename: req.body.Tablename,
    select:req.body.Select
  }
  dbPool.query(`SELECT * FROM ${data.tablename} WHERE ${data.select}`, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

  //profilmódosítás

app.post('/profilmod',(req,res)=>{
  if(session.Rights=="user")
  {
    let data = {
      id: req.body.ID,
      email:req.body.Email,
      nev:req.body.Nev,
      passwd:req.body.Passwd,
      telefon:req.body.Telefon,
    }
    dbPool.query(`UPDATE felhasznalok SET Email='${data.email}',Nev='${data.nev}',Jelszo='${data.passwd}',Telefon='${data.telefon}' WHERE ID=${data.id}`,(err,results)=>{
      if(err)throw err;
      res.json(results);
    })
    
  }
  else
  {
    res.json({message:"Nem módosíthatod ezeket"});
  }
});

  //profilkiválasztás

app.post('/profilselect',(req,res)=>{
  if(session.Rights=="user")
  {
  dbPool.query(`SELECT * FROM felhasznalok WHERE ID=${req.body.ID}`,(err,results)=>{
    if(err)throw err;
    res.json(results);
  })
  }
  else
  {
    res.json({message:"Nem kérheted ezeket le"});
  }
})

  //profil törlése
  
app.post('/profildelete',(req,res)=>{
  if(session.Rights=="user")
  {
    dbPool.query(`DELETE FROM felhasznalok WHERE ID=${req.body.ID}`,(err,results)=>{
      if(err)throw err;
      res.json(results);
    })
  }
  else
  {
    res.json({message:"Nem törölhetsz ezeket le"});
  }
})
  //nyitvatartás select

  app.post('/open',(req,res)=>{
    if(session.Rights=="admin"||session.Rights=="etterem")
    {
      dbPool.query(`SELECT * FROM nyitvatartas WHERE Etterem_ID=${req.body.EtteremID}`,(err,results)=>{
        if(err)throw err;
        res.json(results);
      })
    } else
    {
      res.json({message:"Nem érheted ezeket le"});
    }
  })
  
    //nyitvatartás update
  
  app.post('/openupdate',(req,res)=>{
    if(session.Rights=="admin"||session.Rights=="etterem")
    {
      let data={
        id:req.body.ID,
        nyitas:req.body.Nyitas,
        zaras:req.body.Zaras
      }
    dbPool.query(`UPDATE nyitvatartas SET Nyitas='${data.nyitas}',Zaras='${data.zaras}' WHERE ID=${data.id}`,(err,results)=>{
      if(err)throw err;
      res.json({message:"ok"});
    })
    }
    else
    {
      res.json({message:"Nem érheted ezeket el"});
    }
  })

  //nyitvatartás insert

app.post('/openinsert',(req,res)=>{
  if(session.Rights=="admin"||session.Rights=="etterem")
  {
    let data={
      EtteremID:req.body.ID,
      nap:req.body.Nap,
      nyitas:req.body.Nyitas,
      zaras:req.body.Zaras
    }
    
  dbPool.query(`INSERT INTO nyitvatartas VALUES (null,'${data.EtteremID}','${data.nap}','${data.nyitas}','${data.zaras}')`,(err,results)=>{
    if(err)throw err;
    res.json({message:"ok"});
  })
  }
  else
  {
    res.json({message:"Nem érheted ezeket el"});
  }
}) 

    //étterem nyitvatartás delete
    
app.post('/opendelete',(req,res)=>{
  if(session.Rights=="admin"||session.Rights=="etterem")
  {
    let data={
      id:req.body.ID
    }
        
  dbPool.query(`DELETE FROM nyitvatartas WHERE ID=${data.id}`,(err,results)=>{
    if(err)throw err;
    res.json({message:"ok"});
  })
  }
  else
  {
    res.json({message:"Nem Törölheted ezt le"});
  }
})
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}...`);
});
