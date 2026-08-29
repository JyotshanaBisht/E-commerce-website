function signup(){
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(!username || !email || !password){
        document.getElementById("signupMessage").innerHTML = "Please fill all fields!";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        document.getElementById("signupMessage").innerHTML = "Email already registered! Please login.";
        return;
    }

    users.push({ username: username, email: email, password: password });
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("signupMessage").innerHTML = "Signup successful! Redirecting to login...";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
}