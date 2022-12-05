import {Router } from "express";

import { Todo } from "../models/todos";


const router=Router();

const todos:Todo[]=[];


router.get('/', (req,res,next)=>{
    res.status(200).json({todos:todos});
})

router.post('/todo',(req,res,next)=>{
   const newtodo:Todo={
    id:new Date().toISOString(),
    text:req.body.text
   }

   todos.push(newtodo);
   res.json({res:'Done'});
})

router.delete('deltodo/:todoid',(req,res,next)=>{
    const id=req.params.todoid;
    console.log(id);
    const index=todos.findIndex(todotobedeleted=>todotobedeleted.id===id)
    if(index>=0){
        delete todos[index];
        res.json({res:'Todo Deleted'});
    }
    res.status(404).json({msg:'todo Not found'})
})
router.post('edittodo/:todoid',(req,res,next)=>{
    const id=req.params.todoid;
    const index=todos.findIndex(todotobedeleted=>todotobedeleted.id===id)
    if(index>=0){
        todos[index]={
            id:new Date().toISOString(),
            text:req.body.text
           }
           res.json({res:'Done'});
    }
    res.status(404).json({msg:'todo Not found'})
})
export default router;