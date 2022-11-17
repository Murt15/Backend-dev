const Music=require('../models/music');
const Merch=require('../models/merch');

exports.getMusic=((req,res,next)=>{
  Music.findAll()
  .then((result) => {
   res.json(result) 
  }).catch((err) => {
    console.log(err)
  });
})
exports.getMerch=((req,res,next)=>{
    Merch.findAll()
    .then((result) => {
     res.json(result) 
    }).catch((err) => {
      console.log(err)
    });
  })
