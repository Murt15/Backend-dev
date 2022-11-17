const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const sequelize=require('./utils/database')
const storeRoutes=require('./routes/store')

const app=express();


app.use(bodyParser.json({ extended: false }));
app.use(cors())
app.use(storeRoutes);

sequelize.sync().then((result) => {
    app.listen(5555);
}).catch((err) => {
    console.log(err)
});

app.use((req,res,next)=>{
    res.status(404).send('<h1>Page Not Found</h1>')
})