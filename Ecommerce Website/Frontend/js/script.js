// Notification For Adding products in the Cart

function popNotification(event) {
    if (event.target.id === 'shop-btn') {
        const parentDiv = event.target.parentElement.parentElement;
        // console.log(parentDiv.children)
        const title=parentDiv.children[0].innerText
        const img=parentDiv.children[1].children[0].src
        const price=parentDiv.children[2].children[0].innerText

       

        const container = document.getElementById("notificationContainer");
        const notif = document.createElement("div");
        notif.classList.add("notification");

        notif.innerText = `Your Product: ${title}  is Added To the Cart`;

        container.appendChild(notif);

        setTimeout(() => {
            notif.remove();
        }, 3000);


         //Adding Products in Cart
         var parentNode = document.getElementById("cart-details");
         var childHTML = `<li class="cart-details-li" id=${title}>
                 <span class="cart-details-img"><img src="${img}" alt=""></span>
                 <span class="cart-details-title cart-col">${title}</span>
                 <span class="cart-details-price cart-col">${price}</span>
                 <input  class="cart-details-number" type="number">
                 <button id="remove-btn" class="cart-details-btn" type="submit">Remove</button>
             </li>`
             parentNode.innerHTML = parentNode.innerHTML + childHTML;
         
 
 


    }

}


//remove from Screen

const cart=document.getElementById("cart-details")

cart.addEventListener('click',deleteFromCart)

function deleteFromCart(event){
    if(event.target.id==='remove-btn'){
        const li=event.target.parentElement;
        cart.removeChild(li);
    }
}



function popupCart(event) {
    if (event.target.id === "close-btn" || event.target.id === "cart-btn" || event.target.id === "see-the-cart") {
        const nav = document.getElementById('navCart');
        nav.classList.toggle('active');
    }


    // const btn = event.target.id;
    // btn.classList.toggle('active');


}