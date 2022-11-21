const express=require('express');

const bodyParser=require('body-parser');

const cors=require('cors');

const sequelize=require('./utils/database')

const storeRoutes=require('./routes/store')

const cartRoutes=require('./routes/cart')

const Cart=require('./models/cart');

const CartMusic=require('./models/cartMusic');

const Music=require('./models/music');

const User=require('./models/user');

const Orders=require('./models/order');

const orderMusic=require('./models/orderMusic')

const app=express();

const errorController=require('./Controllers/error');
//RelationShip

// One to One Relationship
User.hasOne(Cart);
Cart.belongsTo(User);

// One to Many Relationship
Orders.belongsTo(User , { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Orders);
Music.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Music);

// Many to Many Relationship
Orders.belongsToMany(Music, {through: orderMusic});
Music.belongsToMany(Orders, {through: orderMusic});
Cart.belongsToMany(Music, {through: CartMusic});
Music.belongsToMany(Cart, {through: CartMusic});



app.use(bodyParser.json({ extended: false }));
app.use(cors());
app.use(storeRoutes);
app.use(cartRoutes);
app.use(errorController.get404);


let tempUser;
sequelize
   //.sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Murtaza', emailid: 'test@gmail.com' });
    }
    return user;
  })
  .then(user => {
     tempUser=user;

    return user.getCart();
  })
  .then(cart=>{
    if(!cart){
      tempUser.createCart();
    }
    return;
  })
  .then(cart => {
    app.listen(5555);
  })
  .catch(err => console.log(err));


app.use((req,res,next)=>{
    res.status(404).send('<h1>Page Not Found</h1>')
})