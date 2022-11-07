const express=require('express');
const bodyParser=require('body-parser');



const app=express();

app.use(bodyParser.urlencoded({extended : true}));

const loginRoutes=require('./routes/login')
const homeRoutes=require('./routes/home');
const messageRoutes=require('./routes/message')



app.use(loginRoutes);
app.use(homeRoutes);
app.use(messageRoutes);



app.use((req,res,next)=>{
    res.status(404).send('<h1>Page Not Found</h1>');
})

app.listen(3000);