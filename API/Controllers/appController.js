
const dbPool=require('../dbModel/DatabaseModel');
const session =require('express-session');
dbPool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log("Connected to database Connid:"+connection.threadId);

});
exports.home=(req,res)=>{
    if(jog=="admin")
    {
      dbPool.query('SELECT * FROM felhasznalok',(err,results)=>{
        if (err)throw err;
        res.send(results);
      
      });
    }
    console.log(jog);
}
exports.login=(req,res)=>{
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
          jog=results[0].Jog;
        }
    });
}