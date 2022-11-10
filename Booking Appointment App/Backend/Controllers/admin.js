//const path=require('path');
const User=require('../Models/users')

exports.getAddUSer=((req,res,next)=>{
    User.findAll()
    .then((val)=>{
        res.json(val);
    })
    .catch(err=>console.log(err))
})
exports.postAddUser=((req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const phoneNumber=req.body.phoneNumber;

    User.create({name:name,email:email,phoneNumber:phoneNumber}).then((result) => {
        
        res.json(result.dataValues);
    }).catch((err) => {
        console.log(err)
    });
   
    //res.redirect('/');
})





exports.postDeleteUser=((req,res,next)=>{
    
    const userId = req.params.userid;
    User.findByPk(userId)
    .then(val => {
      return val.destroy();
    })
    .then(result => {
      console.log('DESTROYED User');
      res.json();
      //res.redirect('/user');
    })
    .catch(err => console.log(err));
})


