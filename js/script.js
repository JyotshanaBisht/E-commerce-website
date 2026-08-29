fetch("http://localhost:5000/api/products")
.then(response=>response.json())
.then(products=>{
    const grid=document.getElementById("productGrid");
    grid.innerHTML="";

    products.forEach(product=>{
        grid.innerHTML+=`
        <div class="product-card">
        <div class="product-name">${product.name}</div>
        <div class="product-price">₹${product.price}</div>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>`;
    });
})
.catch(error=>{
    console.log("Error:",error);
    document.getElementById("productGrid").innerHTML="<p>Products could not be loaded.</p>";
});

function addToCart(productId){
    const userEmail=localStorage.getItem("userEmail");

    if(userEmail==="admin@myshop.com"){
        alert("Admin account se shopping nahi ho sakti.");
        return;
    }

    if(localStorage.getItem("loggedIn")!=="yes"){
        localStorage.setItem("pendingProduct",productId);
        alert("Cart me add karne ke liye pehle login karein.");
        window.location.href="login.html";
        return;
    }

    fetch("http://localhost:5000/api/cart/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({productId:productId})
    })
    .then(response=>response.json())
    .then(data=>{
        alert(data.message);
    })
    .catch(error=>{
        console.log("Error:",error);
    });
}