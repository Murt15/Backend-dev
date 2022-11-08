const express=require('express');

const path=require('path');

const contactController=require('../Controllers/contactus')

const rootDir=require('../util/path');

const router=express.Router();

router.get('/contactus',contactController.contactUs);

router.post('/success',contactController.success);



module.exports=router;