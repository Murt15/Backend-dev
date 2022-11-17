

window.addEventListener('DOMContentLoaded',(data)=>{
    axios.get('http://localhost:5555/products/music')
    .then((Music) => {
        Music.data.forEach(data => {
            var parentNode=document.getElementById("musicContainer");
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
        });
    }).catch((err) => { 
        console.log(err)
    });
    axios.get('http://localhost:5555/products/merch')
    .then((Merch)=>{
        Merch.data.forEach(data=>{
        var parentNode=document.getElementById("merch-container")
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
        
        

        parentNode.innerHTML = parentNode.innerHTML + childHTML;

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



});


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

const cart = document.getElementById("cart-details")

cart.addEventListener('click', removeFromCart)

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


