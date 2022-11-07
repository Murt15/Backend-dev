console.log('a');

console.log('b');

setTimeOut(() => console.log('c'), 3000)

setTimeOut(() => console.log('d'), 0)

console.log('e');

async function print() {

    console.log('a');



    console.log('b');



    await new Promise( (resolve, reject) => {



        setTimeout(() => {

            console.log('c');

            resolve();

            }, 3000);

    })



    await new Promise( (resolve, reject) => {



        setTimeout(() => {

            console.log('d');

            resolve();

            }, 0);

    })



    console.log('e');

}



print();