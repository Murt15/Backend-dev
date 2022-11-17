

// Notification For Adding products in the Cart
var totalPrice = 0.00;


function popNotification(event) {

    if (event.target.id === 'shop-btn') {


        const parentDiv = event.target.parentElement.parentElement;
        const title = parentDiv.children[0].innerText
        const imageUrl = parentDiv.children[1].children[0].src
        const price = parentDiv.children[2].children[0].children[0].innerText
        const quantity=1;

        const cart={
            title:title,imageUrl:imageUrl,price:price,quantity:quantity
        }

        axios.post("http://localhost:5555/cart/add-product",cart)
        .then((data)=>{
            // console.log(data.data);
            var parentNode = document.getElementById("cart-details");
            var childHTML = `<li class="cart-details-li" id=${data.data.id}>
                            <span class="cart-details-img"><img src="${data.data.imageUrl}" alt=""></span>
                            <span class="cart-details-title cart-col">${data.data.title}</span>
                            <span class="cart-details-price cart-col">${data.data.price}</span>
                            <input  class="cart-details-number" type="number" value="${data.data.quantity}">
                            <button id="remove-btn" class="cart-details-btn" type="submit">Remove</button>
                            </li>`
            parentNode.innerHTML = parentNode.innerHTML + childHTML;
    
        })
        .catch(err=>console.log(err))













       
        // console.log(parentDiv.children)
       
        const container = document.getElementById("notificationContainer");
        const notif = document.createElement("div");
        notif.classList.add("notification");

        notif.innerText = `Your Product: ${title}  is Added To the Cart`;

        container.appendChild(notif);

        setTimeout(() => {
            notif.remove();
        }, 3000);


        //Adding Products in Cart
       

        //Adding Total Price
        const total=document.getElementById("total-price")
        const justPrice = parentDiv.children[2].children[0].children[0].innerText
        const fprice = parseFloat(justPrice);
        totalPrice = totalPrice + fprice;

        total.innerText = `Total: $${totalPrice}`;


        


    }

}


//remove from Screen

const cart = document.getElementById("cart-details")

cart.addEventListener('click', removeFromCart)

function removeFromCart(event) {
    if (event.target.id === 'remove-btn') {
        const li = event.target.parentElement;
        cart.removeChild(li);

        //Subtracting From the Total
        const total=document.getElementById("total-price")
        const justPrice =  event.target.parentElement.children[2].innerText.split('$')[1]
        const fprice = parseFloat(justPrice);
        totalPrice = totalPrice - fprice;

        total.innerText = `Total: $${totalPrice}`;
    }

    
}



function popupCart(event) {
    if (event.target.id === "close-btn" || event.target.id === "cart-btn" || event.target.id === "see-the-cart") {
        const nav = document.getElementById('navCart');
        nav.classList.toggle('active');
    }

}
//////////Backend Part
window.addEventListener('DOMContentLoaded',(data)=>{
    axios.get('http://localhost:5555/products/music')
    .then((Music) => {
        Music.data.forEach(data => {
            var parentNode=document.getElementById("musicContainer");
            var childHTML=` <div class="box" id="album1">
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
        var childHTML=`<div class="box" id="merch1">
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
        Products.data.forEach((data)=>{
            var parentNode = document.getElementById("cart-details");
            var childHTML = `<li class="cart-details-li" id=${data.id}>
                            <span class="cart-details-img"><img src="${data.imageUrl}" alt=""></span>
                            <span class="cart-details-title cart-col">${data.title}</span>
                            <span class="cart-details-price cart-col">${data.price}</span>
                            <input  class="cart-details-number" type="number" value="${data.quantity}">
                            <button id="remove-btn" class="cart-details-btn" type="submit">Remove</button>
                            </li>`
            parentNode.innerHTML = parentNode.innerHTML + childHTML;
        })
       

    }).catch(err=>console.log(err));



});

