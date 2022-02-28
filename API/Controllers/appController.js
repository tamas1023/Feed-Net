const dbPool=require("../Models/databaseModel.js");
const session=require('express-session');
exports.home=(req,res)=>{
    res.send("Home");
}
exports.login= async(req,res)=>{
        var email = req.body.email,
            pass = req.body.passwd;
           // var email ="admin@admin.com",
            //pass = "admin";
           // console.log(req.body.email);
            //console.log(req.body.passwd);
            dbPool.query(`SELECT * FROM felhasznalok WHERE email='${email}' AND jelszo=SHA1('${pass}')`, (err, results)=>{
            if (err) throw err;
            if (results.length == 0)
            {
                res.status(500).json({message:"Incorrect e-mail or password!"});
            }
            else
            {

                    // beléphet
                    // session változók létrehozása
                   session.userID = results[0].ID;
                   session.userName = results[0].nev;
                   session.userMail = results[0].email;
                    session.loggedIn = true;
                   
                    res.status(200).json({message:"Belépve"});
            }
        });
}