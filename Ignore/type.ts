const num1Element=document.getElementById('num1') as HTMLInputElement;
const num2Element=document.getElementById('num2') as HTMLInputElement;
const button=document.querySelector('button');
const numResult:Array<number>=[];
const textResult:string[]=[];
type NumorSTr=number|string;
interface Resultobj{
    val:number,
    timeStamp:Date
}

function add(num1:NumorSTr,num2:NumorSTr){
    
    if(typeof num1==='number' && typeof num2==='number')
    {
        return num1 + num2
    }
    
    if(typeof num1==='string' && typeof num2==='string')
    {
        return num1 + ' '+num2

    }
    return +num1 + +num2;
}
function printResult(resultObj:Resultobj){
    console.log(resultObj.val)
}
button?.addEventListener('click',()=>{
    const num1=num1Element.value;
    const num2=num2Element.value;
     const result=add(+num1,+num2);
     numResult.push(result as number)
     const stingResults=add(num1,num2);
     textResult.push(stingResults as string);
     //console.log(result);
     printResult({val:result as number,timeStamp:new Date()});

     console.log(numResult,textResult);
})


const myPromise=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('it is Working')
    },2000);
})

myPromise.then((result)=>{
    console.log(result);
})