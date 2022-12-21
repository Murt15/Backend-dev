const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');


const app = express();
const mongoConnect=require('./util/database').mongoConnect;
const User=require('./models/user')

app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const { log } = require('console');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("63a2ef7fa551c78c63abd541")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
  
});

 app.use('/admin', adminRoutes);
app.use(shopRoutes);

// app.use(errorController.get404);



mongoConnect((client)=>{
  
  app.listen(3000);
})