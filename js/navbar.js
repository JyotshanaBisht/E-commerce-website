function loadNavbar(){
    const navbardiv=document.getElementById("navbar");
    const isLoggedIn=localStorage.getItem("loggedIn")==="yes";
    const username=localStorage.getItem("username");
    const userEmail=localStorage.getItem("userEmail");

    let adminLink=`<a href="admin.html">Admin</a>`;

    let rightSide="";
    if(isLoggedIn){
        rightSide=`
        <span>Hi,${username}</span>
        <button onclick="logout()">Logout</button>
        `;
    }
    else{
        rightSide=`<a href="login.html">Login</a>`;
    }
    navbardiv.innerHTML=`
    <div class="navbar">
    <div class="brand">My Shop</div>
    <a href="index.html">Products</a>
    <a href="cart.html">Cart</a>${adminLink}${rightSide}
    </div>
    `;
}
function logout(){
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("username");
    window.location.href="index.html";
}
loadNavbar();