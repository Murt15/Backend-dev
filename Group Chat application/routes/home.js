const express=require('express');
const fs = require('fs');

const router=express.Router();

router.get('/',(req,res,next) => {

    fs.readFile('message.txt', 'utf8', (errr, data) => {
        res.send(`
            <html>
            <p>${data}<p>
            <form onsubmit="document.getElementById('username').value=localStorage.getItem('Name')" action="/message" method ='POST'>
                <input type="text" id="message" name="message">
                <input type="hidden" id="username" name="name">
                <button type="submit">Send</button>
            </form>
            </html>
        `);
        
        
    })

    
   
    
    
});


router.post('/',(req,res,next) => {

    fs.readFile('message.txt', 'utf8', (errr, data) => {
        res.send(`
            <html>
            <p>${data}<p>
            <form onsubmit="document.getElementById('username').value=localStorage.getItem('Name')" action="/message" method ='POST'>
                <input type="text" id="message" name="message">
                <input type="hidden" id="username" name="name">
                <button type="submit">Send</button>
            </form>
            </html>
        `);
        
    })

    
    
    
    
});


module.exports=router;