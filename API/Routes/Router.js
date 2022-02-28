const express = require('express');
const db = require('mysql');
const sesseion=require('session');
const router = express.Router();
const appController = require('../Controllers/appController.js');
const userController = require('../Controllers/userController.js');

router.get('/', appController.home);
router.post('/login', appController.login);


//router.get('/users', userController.usersList);

module.exports=router;