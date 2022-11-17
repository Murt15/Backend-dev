const Sequelize=require('sequelize');

const sequelize=new Sequelize('ecommerce','root','murt1234',{
    dialect:'mysql',
    host:'localhost'});

    

    module.exports=sequelize;        