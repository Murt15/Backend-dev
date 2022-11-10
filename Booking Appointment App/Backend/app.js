const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');


const app=express();
const userRoutes=require('../Backend/Routes/user')

app.use(bodyParser.json({ extended: false }));
app.use(cors())

// app.use(bodyParser.json({extended : false}));

const sequelize=require('./util/database');

app.use(userRoutes);

sequelize.sync().then((result) => {
    app.listen(7000);
}).catch((err) => {
    console.log(err)
});

app.use((req,res,next)=>{
    res.status(404).send('<h1>Page Not Found</h1>')
})


// app.use((req,res,next)=>{
//     res.status(404).sendFile(path.join(__dirname,'views','404.html'));
// })