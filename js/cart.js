const userEmail=localStorage.getItem("userEmail");
if(userEmail==="admin@myshop.com"){
    alert("Cart cannot be accessed from an admin account.");
    window.location.href="index.html";
}
//cart me product ko add karne ke liye
fetch("http://localhost:5000/api/cart")
.then(response=>response.json())
.then(cart=>{
    const cartDiv=document.getElementById("cartItems");
    const totalDiv=document.getElementById("cartTotal");

    if(cart.length===0){
        cartDiv.innerHTML="<p>Your cart is empty.</p>";
        totalDiv.innerHTML="";
        return;
    }
    cartDiv.innerHTML="";
    let total=0;
    cart.forEach(item=>{
        cartDiv.innerHTML+=
        `<div class="product-card">
        <div class="product-name">${item.name}</div>
        <div class="product-price">₹${item.price}</div>
        <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>`;
        total+=item.price;
    });
    totalDiv.innerHTML="Total:₹"+total;
})
.catch(error=>{
    console.log("Error:",error);
    document.getElementById("cartItems").innerHTML="<p>Cart is not loading.</p>";
});
//order place ke liye
function placeOrder(){
    const address=document.getElementById("address").value;

    fetch("http://localhost:5000/api/checkout",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({address:address})
    })
    .then(response=>response.json())
    .then(data=>{
        document.getElementById("orderMessage").innerHTML=data.message;
        
        if(data.order){
            document.getElementById("cartItems").innerHTML="";
            document.getElementById("cartTotal").innerHTML="";
            document.getElementById("address").value="";
        }
    })
    .catch(error=>{
        console.log("Error:",error);
    });
}
//removing the product from the cart
function removeFromCart(productId){
    fetch("http://localhost:5000/api/cart/remove",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({productId:productId})
    })
    .then(response=>response.json())
    .then(data=>{
        location.reload();
    })
    .catch(error=>{
        console.log("Error:",error);
    });
}