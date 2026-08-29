function login(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(!email || !password){
        document.getElementById("loginMessage").innerHTML = "Please fill all fields!";
        return;
    }

    // Admin ke liye direct login
    if(email === "admin@myshop.com" && password === "admin123"){
        localStorage.setItem("loggedIn", "yes");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("username", "Admin");
        window.location.href = "index.html";
        return;
    }

    // LocalStorage se registered users ki list nikalein
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check karein ki user match ho raha hai ya nahi
    const validUser = users.find(u => u.email === email && u.password === password);

    if(validUser){
        document.getElementById("loginMessage").innerHTML = "Login Successful!";
        localStorage.setItem("loggedIn", "yes");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("username", validUser.username);

        const pendingProduct = localStorage.getItem("pendingProduct");

        if(pendingProduct){
            // GitHub Pages ke liye cart mein item localStorage mein add karenge
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(Number(pendingProduct));
            localStorage.setItem("cart", JSON.stringify(cart));
            
            localStorage.removeItem("pendingProduct");
            window.location.href = "index.html";
        }
        else{
            setTimeout(() => {
                window.location.href = "index.html";
            }, 500);
        }
    }
    else {
        document.getElementById("loginMessage").innerHTML = "Invalid email or password!";
    }
}