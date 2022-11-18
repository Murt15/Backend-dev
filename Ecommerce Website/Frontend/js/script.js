const mparentNode=document.getElementById("merch-container")

const parentNode=document.getElementById("musicContainer");

const order=document.getElementById("purchase-now");

const cart = document.getElementById("cart-details")

order.addEventListener('click',placeOrder)

cart.addEventListener('click', removeFromCart)

const pagination=document.getElementById("pagination");
// Event Listener For refreshing the Page
window.addEventListener('DOMContentLoaded',(data)=>{
    const page=1;
    getProducts(page);
    
});


function getProducts(page){
    parentNode.innerHTML='';
    mparentNode.innerHTML='';
    axios.get(`http://localhost:5555/products/music/?page=${page}`)
    .then((Music) => {
        // console.log(Music.data);
        //console.log(Music.data.data);
        Music.data.data.forEach(data => {
            
            var childHTML=` <div class="box" id="${data.id}">
                                <h3 class="h3">${data.title}</h3>
                                <div class="img-cont">
                                    <img class="product-imgs"
                                        src="${data.imageUrl}"
                                        alt="">
                                </div>
                                <div class="product-details">
                                    <span>$<span>${data.price}</span></span>
                                    <button class="shop-btn" id="shop-btn" type='button'>ADD TO CART</button>
                                </div>
                            </div>`
            parentNode.innerHTML = parentNode.innerHTML + childHTML;
            showPagination(Music.data.currentPage,Music.data.hasNextPage,Music.data.hasPreviousPage,Music.data.lastPage,Music.data.nextPage,Music.data.previousPage)
        });
        
            
    }).catch((err) => { 
        console.log(err)
    });
    axios.get(`http://localhost:5555/products/merch/?page=${page}`)
    .then((Merch)=>{
        //console.log(Merch.data.data)
        Merch.data.data.forEach(data=>{
        
        var childHTML=`<div class="box" id="${data.id}">
                            <h3 class="h3">${data.title}</h3>
                            <div class="img-cont">
                                <img class="product-imgs"
                                    src="${data.imageUrl}"
                                    alt="">
                            </div>
                            <div class="product-details">
                                <span>$<span>${data.price}</span></span>
                                <button class="shop-btn" id="shop-btn" type='button'>ADD TO CART</button>
                            </div>
                        </div>`
        
        

        mparentNode.innerHTML = mparentNode.innerHTML + childHTML;
        //    showPagination(Merch.data); 
        })
    })
    .catch((err)=>{
        console.log(err);
    })
    axios.get('http://localhost:5555/cart/get-products')      
    .then((Products)=>{
        var totalPrice=0;
        Products.data.forEach((data)=>{
            var parentNode = document.getElementById("cart-details");
            var childHTML = `<li class="cart-details-li" id=${data.id}>
                            <span class="cart-details-img"><img src="${data.imageUrl}" alt=""></span>
                            <span class="cart-details-title cart-col">${data.title}</span>
                            <span class="cart-details-price cart-col">$${data.price}</span>
                            <input  class="cart-details-number" type="number" value="${data.quantity}">
                            <button id="remove-btn" class="cart-details-btn" type="submit">Remove</button>
                            </li>`
                            
            parentNode.innerHTML = parentNode.innerHTML + childHTML;
            const total=document.getElementById("total-price");
            totalPrice = totalPrice + data.price;
            total.innerText = `Total: $${totalPrice}`;

        })
        

    }).catch(err=>console.log(err));
}

function popNotification(event) {

    if (event.target.id === 'shop-btn') {
        
        const id=event.target.parentElement.parentElement.id
        const parentDiv = event.target.parentElement.parentElement;
        const title = parentDiv.children[0].innerText
        const imageUrl = parentDiv.children[1].children[0].src
        const price = parentDiv.children[2].children[0].children[0].innerText
        const quantity=1;

        const cart={
           id:id, title:title,imageUrl:imageUrl,price:price,quantity:quantity
        }

        axios.post("http://localhost:5555/cart/add-product",cart)
        .then((data)=>{
            // Adding Products in Cart
            var parentNode = document.getElementById("cart-details");
            var childHTML = `<li class="cart-details-li" id=${data.data.id}>
                            <span class="cart-details-img"><img src="${data.data.imageUrl}" alt=""></span>
                            <span class="cart-details-title cart-col">${data.data.title}</span>
                            <span class="cart-details-price cart-col">$${data.data.price}</span>
                            <input  class="cart-details-number" type="number" value="${data.data.quantity}">
                            <button id="remove-btn" class="cart-details-btn" type="submit">Remove</button>
                            </li>`
            parentNode.innerHTML = parentNode.innerHTML + childHTML;
            // console.log(totalPrice);
            // const total=document.getElementById("total-price");
            // totalPrice = totalPrice + data.data.price;
            // total.innerText = `Total: $${totalPrice}`;
    
        })
        .catch(err=>console.log(err))


        //Popping Notification for adding the product in cart
       
        const container = document.getElementById("notificationContainer");
        const notif = document.createElement("div");
        notif.classList.add("notification");

        notif.innerText = `Your Product: ${title}  is Added To the Cart`;

        container.appendChild(notif);

        setTimeout(() => {
            notif.remove();
        }, 3000);


        //Adding Total Price
        
        
        

       


        


    }

}

//Remove From Screen and delete From backend
function removeFromCart(event) {
    if (event.target.id === 'remove-btn') {
        
        
        responseid=event.target.parentElement.id
        const url="http://localhost:5555/cart/delete-product/"+responseid
        axios.post(url)
        .then(()=>{
            const li = event.target.parentElement;
            cart.removeChild(li);
             //Subtracting From the Total
            
            })
        .catch(err=>console.log(err))

        //Subtract Total 

       
    }

    
}


function popupCart(event) {
    if (event.target.id === "close-btn" || event.target.id === "cart-btn" || event.target.id === "see-the-cart") {
        const nav = document.getElementById('navCart');
        nav.classList.toggle('active');
    }

}

function showPagination(currentPage,hasNextPage,hasPreviousPage,lastPage,nextPage,previousPage){
    pagination.innerHTML='';

    if(hasPreviousPage){
        const button2 = document.createElement('button');
        //button2.classList.add('active');
        button2.innerHTML = previousPage;
        button2.addEventListener('click', ()=>getProducts(previousPage));
        pagination.appendChild(button2);

    }



    const button1 = document.createElement('button');
    //button1.classList.add('active');
    button1.innerHTML = `<h3>${currentPage}<h3>`;
    
    button1.addEventListener('click', ()=>getProducts(currentPage))
    pagination.appendChild(button1);

    if(hasNextPage){
        const button3 = document.createElement('button');
        button3.classList.add('active');
        button3.innerHTML = nextPage;
        button3.addEventListener('click',()=>getProducts(nextPage))
        pagination.appendChild(button3);
    }
    // // if(lastPage!==currentPage && nextPage !==lastPage){
    // //     const button4 = document.createElement('button');
    // //     button4.classList.add('active');
    // //     button4.innerHTML = nextPage;
    // //     button4.addEventListener('click',()=>getProducts(lastPage))
    // //     pagination.appendChild(button4);
    // // }
}

function placeOrder(event){
    axios.get("http://localhost:5555/cart/get-products")
    .then((Products)=>{


        var totalPrice=0;
        const total=document.getElementById("total-price");
        totalPrice = totalPrice + data.price;
        total.innerText = `Total: $${totalPrice}`;
    })
    .catch()
    
}