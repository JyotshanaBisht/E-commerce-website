fetch('products.json')
.then(response => response.json())
.then(products => {
    const grid=document.getElementById("productGrid");
    grid.innerHTML="";

    products.forEach(product => {
        grid.innerHTML +=`
        <div class="product-card">
        <div class="product-name">${product.name}</div>
        <div class="product-price">₹${product.price}</div>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>`;
    });
})
.catch(error =>{
    console.log("Error:",error);
    document.getElementById("productGrid").innerHTML="<p>Products could not be loaded.</p>"
});

function addToCart(productId){
    const userEmail=localStorage.getItem("userEmail");

    if(userEmail==="admin@myshop.com"){
        alert("Shopping cannot be done from an admin account.");
        return;
    }

    if(localStorage.getItem("loggedIn")!=="yes"){
        localStorage.setItem("pendingProduct",productId);
        alert("Please login to add items to your cart.");
        window.location.href="login.html";
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart successfully!");
}