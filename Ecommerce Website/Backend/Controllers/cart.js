const Cart=require('../models/cart');

exports.postProduct=((req,res,next)=>{
    console.log(req.body)
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const price=req.body.price;
    const quantity=req.body.quantity;

    Cart.create({title:title,imageUrl:imageUrl,price:price,quantity:quantity})
    .then((result) => {
     res.json(result);
     //     res.json(result.dataValues);   
    }).catch((err) => {
        console.log(err)
    });
})

exports.getProduct=((req,res,next)=>{
    Cart.findAll()
  .then((result) => {
   res.json(result) 
  }).catch((err) => {
    console.log(err)
  });
})