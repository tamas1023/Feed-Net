const mysql=require('mysql');
const express=require('express');
const sesseion=require('session');
const router=express.Router();
const appController=require('../Controllers/appController');
const userController=require('../Controllers/userController');

router.get('/',appController.home);
router.get('/login',appController.login);

module.exports = router;
