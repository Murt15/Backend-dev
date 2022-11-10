const express=require('express');

const path=require('path');

const contactController=require('../Controllers/admin')

const router=express.Router();

router.post('/user/add-user',contactController.postAddUser)

router.get('/user',contactController.getAddUSer)

router.post('/user/delete-user/:userid',contactController.postDeleteUser)

module.exports=router;