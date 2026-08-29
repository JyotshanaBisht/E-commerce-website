const userEmail=localStorage.getItem("userEmail");

if(userEmail !== "admin@myshop.com"){
    alert("Access Denied.Only admin can access it.");
    window.location.href="index.html";
}
function loadProducts() {
    fetch("http://localhost:5000/api/products")
    .then(response => response.json())
    .then(products => {
        const listDiv = document.getElementById("productList");
        listDiv.innerHTML = "";

        products.forEach(product => {
            listDiv.innerHTML += `
                <div class="product-card">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">₹${product.price}</div>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            `;
        });
    });
}

function addProduct() {
    const name = document.getElementById("productName").value;
    const price = Number(document.getElementById("productPrice").value);

    fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, price: price })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("adminMessage").innerText = data.message;
        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        loadProducts();
    });
}

function deleteProduct(productId) {
    fetch("http://localhost:5000/api/products/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: productId })
    })
    .then(response => response.json())
    .then(data => {
        loadProducts();
    });
}

loadProducts();