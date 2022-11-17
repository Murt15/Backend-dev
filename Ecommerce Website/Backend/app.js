const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const sequelize=require('./utils/database')
const storeRoutes=require('./routes/store')
const cartRoutes=require('./routes/cart')

const app=express();


app.use(bodyParser.json({ extended: false }));
app.use(cors())
app.use(storeRoutes);
app.use(cartRoutes);

sequelize.sync().then((result) => {
    app.listen(5555);
}).catch((err) => {
    console.log(err)
});

app.use((req,res,next)=>{
    res.status(404).send('<h1>Page Not Found</h1>')
})