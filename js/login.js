function login(){
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

    fetch("http://localhost:5000/api/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email:email, password:password})
    })
    .then(response=>response.json())
    .then(data=>{
        document.getElementById("loginMessage").innerHTML=data.message;

        if(data.message==="Login Successful!"){
            localStorage.setItem("loggedIn","yes");
            localStorage.setItem("userEmail",email);
            localStorage.setItem("username",data.username);

            const pendingProduct=localStorage.getItem("pendingProduct");

            if(pendingProduct){
                fetch("http://localhost:5000/api/cart/add",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({productId:Number(pendingProduct)})
                })
                .then(response=>response.json())
                .then(()=>{
                    localStorage.removeItem("pendingProduct");
                    window.location.href="index.html";
                });
            }
            else{
                window.location.href="index.html";
            }
        }
    })
    .catch(error=>{
        console.log("Error:",error);
    });
}