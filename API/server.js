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

    //Log out

app.get('/logout',(req,res)=>{
    session.Rights="";
    session.LoggedIn=false;
    session.Email="";
    session.ID=-1;
    req.session.destroy();

    res.json({message:"ok"});
})

    //login

app.post('/login', (req, res) => {
  let data = {
      email: req.body.Email,
      pass: req.body.passwd,
  }
  dbPool.query(`SELECT * FROM felhasznalok WHERE Email=? AND jelszo=?`,[data.email,data.pass], (err, results) => {
      if (err) throw err;
      res.json(results);
      if(results.length>0&&results[0].Statusz==1)
      {
        sesssion=req.session
        session.Rights=results[0].Jog;
        session.LoggedIn=true;
        session.Email=results[0].Email;
        session.ID=results[0].ID;
        jog=results[0].Jog;
      }
  });

    //belépési dátum
  dbPool.query(`UPDATE felhasznalok SET Belepes=CURRENT_TIME WHERE Email=?`,[data.email],(err,resluts)=>{
    if(err)throw err;
  })
});

  //registration

app.post("/reg",(req,res)=>{
  let data = {
    email: req.body.Email,
    name:req.body.Name,
    pass: req.body.passwd,
}
dbPool.query(`INSERT INTO felhasznalok VALUES (NULL, ?, ?, ?, NULL, CURRENT_TIME, NULL, '1', 'user');`,[data.email,data.name,data.pass],(err,results)=>{
  if(err)throw err;
  res.json({message:"ok"});
})
})

// check if email already exists

app.post('/emailcheck',(req,res)=>{
    let data = {
      table: req.body.Table,
      email: req.body.Email,
    }
    
    dbPool.query(`SELECT * FROM ${data.table} WHERE Email=?`,[data.email], (err, results) => {
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
      res.json({message:"Nem engedélyezett"});
    }
  });
  
  //admin étterem update

app.post('/admindiningupdate',(req,res)=>{
  if(session.Rights=="admin"||session.Rights=="etterem")
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
      statusz:req.body.Statusz,
      weboldal:req.body.Weboldal,
      facebook:req.body.Facebook,
      tipus:req.body.Tipus,
      wifi:req.body.Wifi
    }
    dbPool.query(`UPDATE ettermek SET ID=?,Email=?,Nev=?,Telefon=?,Parkolo=?,Bankkartya=?,Glutenmentes=?,Terasz=?,Berelheto=?,Cim=?,Ferohely=?,Hazhozszallitas=?,Leiras=?,Statusz=?,Weboldal=?,Facebook=?,Tipus=?,Wifi=? WHERE ID=?`,[data.id,data.email,data.nev,data.telefon,data.parkolo,data.bankkartya,data.glutenmentes,data.terasz,data.berelheto,data.cim,data.ferohely,data.hazhozszallitas,data.leiras,data.statusz,data.weboldal,data.facebook,data.tipus,data.wifi,data.id],(err,results)=>{
      if(err)throw err;
      res.json(results);
    });
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
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
      statusz:req.body.Statusz,
      weboldal:req.body.Weboldal,
      facebook:req.body.Facebook,
      tipus:req.body.Tipus,
      wifi:req.body.Wifi
    }
    dbPool.query(`INSERT INTO ettermek VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'',?,?,'')`,[data.email,data.nev,data.telefon,data.parkolo,data.bankkartya,data.glutenmentes,data.terasz,data.berelheto,data.cim,data.ferohely,data.hazhozszallitas,data.leiras,data.tipus,data.wifi,data.statusz,data.weboldal,data.facebook],(err,results)=>{
      if(err)throw err;
      res.json(results);
    });
    let passwd="73f6d8310155c0a0f5ea64237973990aea02a932";//SpassKno839
    dbPool.query(`SELECT * FROM felhasznalok WHERE Email=?`,[data.email],(err,results)=>{
      if(err)throw err;
      if(results.length==0)
      {
        dbPool.query(`INSERT INTO felhasznalok VALUES (NULL,?,?,?, NULL, CURRENT_TIME, NULL, '1', 'etterem');`,[data.email,data.nev,passwd],(err,r)=>{
          if(err)throw err;
        })
      }
    })
    
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})

  //admin étlap select

app.post('/adminfoodselect',(req,res)=>{
  if(session.Rights=="admin"||session.Rights=="etterem")
  {
    dbPool.query(`SELECT * FROM etlap WHERE Etterem_ID=?`,[req.body.id],(err,results)=>{
      if(err)throw err;
      res.json(results);
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})

  //admin étlap delete

app.post('/adminfooddelete',(req,res)=>{
  if(session.Rights=="admin"||session.Rights=="etterem")
  {
    dbPool.query(`DELETE FROM etlap WHERE ID=?`,[req.body.id],(err,results)=>{
      if(err)throw err;
      res.json({message:"törlve lett"});
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
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
    dbPool.query(`INSERT INTO etlap VALUES(NULL,?,?,?,?)`,[data.etteremid,data.nev,data.ar,data.leiras],(err,results)=>{
      if(err)throw err;
      res.json({message:"felvéve lett étel"});
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
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
    dbPool.query(`UPDATE etlap SET ID=${data.id}, Etterem_ID=${data.etteremid},Nev='${data.nev}',Ar=${data.ar},Leiras='${data.leiras}' WHERE ID=${data.id} AND Etterem_ID=${data.etteremid} `,[data.id,data.etteremid,data.nev,data.ar,data.leiras,data.id,data.etteremid],(err,results)=>{
      if(err)throw err;
      res.json({message:"módosítva lett étel"});
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
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
    res.json({message:"Nem engedélyezett"});
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
      dbPool.query(`INSERT INTO felhasznalok VALUES(NULL,?,?,?,?,CURRENT_TIME,NULL,?,?);`,[data.email,data.name,data.pass,data.telefon,data.statusz,data.jog],(err,results)=>{
        if(err)throw err;
        res.json({message:"felhasználó felvéve"});
      })
    }
    else
    {
      res.json({message:"Nem engedélyezett"});
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
    dbPool.query(`UPDATE felhasznalok SET Email=?,Nev=?,Jelszo=?,Telefon=?,Statusz=?,Jog=? WHERE ID=? AND Jog NOT LIKE 'admin';`,[data.email,data.name,data.pass,data.telefon,data.statusz,data.jog,data.id],(err,results)=>{
      if(err)throw err;
      res.json({message:"felhasználó módosítva"});
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})

  //admin felhasználók delete

app.post('/userdelete',(req,res)=>{
  if(session.Rights=="admin")
  {
    dbPool.query(`DELETE FROM felhasznalok WHERE ID=? AND Jog NOT LIKE 'admin'`,[req.body.ID],(err,results)=>{
      if(err)throw err;
      res.json({message:"Felhasználó törölve"});
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
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
      res.json({message:"Nem engedélyezett"});
    }
  })

    //admin hibajelentés delete

app.post('/errordelete',(req,res)=>{
  if(session.Rights=="admin")
  {
    dbPool.query(`DELETE FROM hibajelentes WHERE ID=?`,[req.body.ID],(err,results)=>{
      if(err)throw err;
      res.json({message:"Hibajelentés törölve"});
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})

//rating select
app.get('/ratingselect',(req,res)=>{
  if(session.Rights=="admin")
  {
    dbPool.query(`SELECT  ertekeles.ID,ettermek.Nev as EtNev,felhasznalok.Nev,ertekeles.Ertekeles,ertekeles.Pontszam,ertekeles.Datum FROM ertekeles,ettermek,felhasznalok WHERE Etterem_ID=ettermek.ID AND felhasznalok.ID=Felhasznalo_ID ORDER BY ertekeles.Datum DESC `,(err,results)=>{
      if(err)throw err;
      res.json(results);
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})

//rating delete

app.post('/ratingdelete',(req,res)=>{
  if(session.Rights=="admin")
  {
    dbPool.query(`DELETE FROM ertekeles WHERE ID=?`,[req.body.ID],(err,results)=>{
      if(err)throw err;
      res.json({message:"Értékelés törlése"});
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})
  //étterem is meghatározása
app.post('/etteremid',(req,res)=>{
  if(session.Rights=="etterem")
  {
    dbPool.query(`SELECT ettermek.ID FROM felhasznalok,ettermek WHERE felhasznalok.Email=ettermek.Email AND ettermek.Email=?`,[req.body.Email],(err,results)=>{
      if(err)throw err;
      res.json(results);
    });
  }
})

  //etterem rendelések select

app.post("/etteremselect",(req,res)=>{
  if(session.Rights=="etterem")
  {
    dbPool.query(`SELECT helyfoglalas.ID,helyfoglalas.Fo,helyfoglalas.Kezdes,felhasznalok.Nev,CURRENT_TIMESTAMP AS ido FROM helyfoglalas,felhasznalok WHERE felhasznalok.ID=helyfoglalas.Felhasznalo_ID AND Etterem_ID=? ${req.body.Feltetel} ORDER BY helyfoglalas.Kezdes DESC`,[req.body.EtteremID],(err,results)=>{
      if(err)throw err;
      res.json(results);
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})

//etterem rendelések delete

app.post("/etteremdelete",(req,res)=>{
  if(session.Rights=="etterem")
  {
    dbPool.query(`DELETE FROM helyfoglalas WHERE ID=?`,[req.body.ID],(err,results)=>{
      if(err)throw err;
        res.json({message:"Helyfoglalás törlése"});
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})

//Kedvencekhez adás
app.post('/FavoriteAdd', (req, res) => {
  if(session.Rights=="etterem"||session.Rights=="admin"||session.Rights=="user")
  {
    let data = {
      tablename: req.body.Tablename,
      EtteremID:req.body.Etterem_ID,
      FelhasznaloID:req.body.Felhasznalo_ID,
    }
    dbPool.query(`INSERT INTO ${data.tablename} VALUES(NULL,?,?) `,[data.EtteremID,data.FelhasznaloID], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
});
//Kedvencek törlés
app.post('/FavoriteDelete', (req, res) => {
  if(session.Rights=="etterem"||session.Rights=="admin"||session.Rights=="user")
  {
    let data = {
      tablename: req.body.Tablename,
      EtteremID:req.body.Etterem_ID,
      FelhasznaloID:req.body.Felhasznalo_ID,
    }
    dbPool.query(`DELETE FROM ${data.tablename} WHERE Etterem_ID=? AND Felhasznalo_ID=? `,[data.EtteremID,data.FelhasznaloID], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
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
  if(session.Rights=="etterem"||session.Rights=="admin"||session.Rights=="user")
  {
    let data = {
      Etterem_ID:req.body.Etterem_ID,
      Felhasznalo_ID:req.body.Felhasznalo_ID,
      Datum:req.body.Datum,
      Fo:req.body.Fo
  }
    dbPool.query(`INSERT INTO helyfoglalas VALUES(NULL,?,?,?,?)`,[data.Felhasznalo_ID,data.Etterem_ID,data.Datum,data.Fo],(err,results)=>{
      if(err) throw err;
      res.json({message:"Felvéve!"});
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})

//ertekeles insert

  app.post('/ratingInsert',(req,res)=>{
    if(session.Rights=="etterem"||session.Rights=="admin"||session.Rights=="user")
    {
      let data = {
        Etterem_ID:req.body.Etterem_ID,
        Felhasznalo_ID:req.body.Felhasznalo_ID,
        Pontszam:req.body.Pontszam,
        Ertekeles:req.body.Ertekeles
      }
      dbPool.query(`INSERT INTO ertekeles VALUES(NULL,?,?,?,?,CURRENT_TIME)`,[data.Etterem_ID,data.Felhasznalo_ID,data.Pontszam,data.Ertekeles],(err,results)=>{
        if(err)throw err;
        res.json({message:"Felvéve!"});
      })
    }
    else
    {
      res.json({message:"Nem engedélyezett"});
    }
  })

  //ertekeles torles
app.post('/ratingDeleteuser',(req,res)=>{
    if(session.Rights=="admin"||session.Rights=="user"||session.Rights=="etterem")
  {
    dbPool.query(`DELETE FROM ertekeles WHERE ID=?`,[req.body.ID],(err,results)=>{
      if(err)throw err;
      res.json({message:"ok"});
    })
  }
  else{
    res.json({message:"nem ok"});
  }
    
})
//értékelés módosítás
app.post('/updateRating',(req,res)=>{
  if(session.Rights=="admin"||session.Rights=="user"||session.Rights=="etterem")
  {
    let data = {
      tablename:req.body.Tablename,
      mitmire:req.body.Mitmire,
      hol: req.body.Hol,
      
    }
    dbPool.query(`UPDATE ${data.tablename} SET ${data.mitmire}, Datum=CURRENT_TIMESTAMP WHERE ${data.hol}`,(err,results)=>{
      if(err)throw err;
      res.json({message:"Módosítva az értékelés"});
      
    });
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})
//probléma jelentés
app.post('/insertProblem',(req,res)=>{
  if(session.Rights=="admin"||session.Rights=="user"||session.Rights=="etterem")
  {
    let data = {
      tablename:req.body.Tablename,
      felhasznaloid:req.body.Felhasznalo_ID,
      etteremid:req.body.Etterem_ID,
      tipus:req.body.Tipus,
      leiras:req.body.Leiras, 
    }
    
    dbPool.query(`INSERT INTO ${data.tablename} VALUES(NULL,?,?,?,?)`,[data.felhasznaloid,data.etteremid,data.tipus,data.leiras],(err,results)=>{
      if(err) throw err;
      res.json({message:"Hiba felvétele"});
      
    });
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
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
  if(session.Rights=="user"||session.Rights=="etterem"||session.Rights=="admin")
  {
    let data = {
      id: req.body.ID,
      email:req.body.Email,
      nev:req.body.Nev,
      passwd:req.body.Passwd,
      telefon:req.body.Telefon,
    }
    if(session.ID==req.body.ID)
    {
      dbPool.query(`UPDATE felhasznalok SET Email=?,Nev=?,Jelszo=?,Telefon=? WHERE ID=?`,[data.email,data.nev,data.passwd,data.telefon,data.id],(err,results)=>{
        if(err)throw err;
        res.json({message:"Profil módosítva"});
      })
    }
    else
    {
      res.json({message:"Nincs jogod ezeket Módosítani"})
    }
    
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
});

  //profilkiválasztás

app.post('/profilselect',(req,res)=>{
  if(session.Rights=="user"||session.Rights=="etterem"||session.Rights=="admin")
  {
  dbPool.query(`SELECT * FROM felhasznalok WHERE ID=?`,[req.body.ID],(err,results)=>{
    if(err)throw err;
    res.json(results);
  })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})

  //nyitvatartás select

  app.post('/open',(req,res)=>{
    if(session.Rights=="admin"||session.Rights=="etterem")
    {
      dbPool.query(`SELECT * FROM nyitvatartas WHERE Etterem_ID=?`,[req.body.EtteremID],(err,results)=>{
        if(err)throw err;
        res.json(results);
      })
    } else
    {
      res.json({message:"Nem engedélyezett"});
    }
  })
  
    //nyitvatartás update
  
  app.post('/openupdate',(req,res)=>{
    if(session.Rights=="admin"||session.Rights=="etterem")
    {
      let data={
        id:req.body.ID,
        nyitas:req.body.Nyitas,
        zaras:req.body.Zaras,
        napid:req.body.Napid,
        nap:req.body.Nap
      }
      if(data.nyitas==null&&data.zaras==null)
      {
        dbPool.query(`UPDATE nyitvatartas SET Nyitas=${data.nyitas},Zaras=${data.zaras},napid=?,Nap=? WHERE ID=?`,[data.napid,data.nap,data.id],(err,results)=>{
          if(err)throw err;
          res.json({message:"Nyitvatartás módosítása"});
        })
      }
      else
      {
        dbPool.query(`UPDATE nyitvatartas SET Nyitas=?,Zaras=?,napid=?,Nap=? WHERE ID=?`,[data.nyitas,data.zaras,data.napid,data.nap,data.id],(err,results)=>{
          if(err)throw err;
          res.json({message:"Nyitvatartás módosítása"});
        })
      }
   
    }
    else
    {
      res.json({message:"Nem engedélyezett"});
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
      zaras:req.body.Zaras,
      napid:req.body.Napid
    }
    
  dbPool.query(`INSERT INTO nyitvatartas VALUES (null,?,?,?,?,?)`,[data.EtteremID,data.nap,data.napid,data.nyitas,data.zaras],(err,results)=>{
    if(err)throw err;
    res.json({message:"Nytivatartás felvéve"});
  })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
}) 

    //étterem nyitvatartás delete
    
app.post('/opendelete',(req,res)=>{
  if(session.Rights=="admin"||session.Rights=="etterem")
  {
    let data={
      id:req.body.ID
    }
        
  dbPool.query(`DELETE FROM nyitvatartas WHERE ID=?`,[data.id],(err,results)=>{
    if(err)throw err;
    res.json({message:"Nyitvatartás törölve lett"});
  })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})

  //helyfoglalás select
  
  app.post('/reservationSelect',(req,res)=>{
    if(session.Rights=="user"||session.Rights=="admin")
    {
      let data={
        id:req.body.ID,
        feltetel:req.body.Feltetel
      }
          
    dbPool.query(`SELECT helyfoglalas.ID,ettermek.Nev,helyfoglalas.Felhasznalo_ID,Kezdes,Fo,helyfoglalas.Etterem_ID FROM helyfoglalas,ettermek WHERE ettermek.ID=helyfoglalas.Etterem_ID AND Felhasznalo_ID=? ${data.feltetel} ORDER BY Kezdes desc `,[data.id],(err,results)=>{
      if(err)throw err;
      res.json(results);
    })
    }
    else
    {
      res.json({message:"Nem engedélyezett"});
    }
  })

  //helyfoglalás update  

 app.post('/reservationUpdate',(req,res)=>{
  if(session.Rights=="user"||session.Rights=="admin")
  {
    let data={
      id:req.body.ID,
      kezdes:req.body.Kezdes,
      fo:req.body.Fo
    }
  dbPool.query(`UPDATE helyfoglalas SET Kezdes=?,Fo=? WHERE ID=?`,[data.kezdes,data.fo,data.id],(err,results)=>{
    if(err)throw err;
    res.json({message:'Módosítva!'});
  })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})

  //helyfoglalás delete

app.post("/reservationDelete",(req,res)=>{
  if(session.Rights=="user"||session.Rights=="admin")
  {
    dbPool.query(`DELETE FROM helyfoglalas WHERE ID=?`,[req.body.ID],(err,results)=>{
      if(err)throw err;
        res.json({message:"Törlve lett a helyfoglalás"});
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})

  //képek select

app.post("/imageselect",(req,res)=>{
  if(session.Rights=="etterem"||session.Rights=="admin")
  {
    dbPool.query(`SELECT * FROM kepek WHERE Etterem_ID=?`,[req.body.ID],(err,results)=>{
      if(err)throw err;
        res.json(results);
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})

  //képek delete

app.post("/imagedelete",(req,res)=>{
  if(session.Rights=="etterem"||session.Rights=="admin")
  {
    dbPool.query(`DELETE FROM kepek WHERE ID=?`,[req.body.ID],(err,results)=>{
      if(err)throw err;
      res.json({message:"Kép törölve lett"});
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})

  //képek update

app.post("/imageupdate",(req,res)=>{
  if(session.Rights=="etterem"||session.Rights=="admin")
  {
    let data={
      id:req.body.ID,
      img:req.body.IMG,
    }
    dbPool.query(`UPDATE kepek SET Kepek=? WHERE ID=?`,[data.img,data.id],(err,results)=>{
      if(err)throw err;
      res.json({message:"Kép módosítva lett"});
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})

  //kép insert

app.post("/imageinsert",(req,res)=>{
  if(session.Rights=="etterem"||session.Rights=="admin")
  {
    let data={
      etterem_id:req.body.EtteremID,
      img:req.body.IMG,
    }
    dbPool.query(`INSERT INTO kepek VALUES(null,?,?)`,[data.etterem_id,data.img],(err,results)=>{
      if(err)throw err;
      res.json({message:"Kép beillesztve lett"});
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})

  //idő lekérdezése

app.get("/time",(req,res)=>{
  if(session.Rights=="user"||session.Rights=="admin"||session.Rights=="etterem")
  {
    dbPool.query('SELECT CURRENT_TIMESTAMP AS Ido',(err,results)=>{
      if(err)throw err;
      res.json(results);
    })
  }
  else
  {
    res.json({message:"Nem engedélyezett"});
  }
})

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}...`);
});
