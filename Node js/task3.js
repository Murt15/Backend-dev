const arr = ['apple', 'oranges' , ' ', 'mango', ' ' , 'lemon'];


const mod=arr.map( (a)=>{
    if(a==' '){
        return  "Empty String";
    }else {
    return a;
    }
})

console.log(mod);
