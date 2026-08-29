function signup(){
    const username=document.getElementById("username").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

    fetch("http://localhost:5000/api/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username:username, email:email, password:password})
    })
    .then(response=>response.json())
    .then(data=>{
        document.getElementById("signupMessage").innerHTML=data.message;
    })
    .catch(error=>{
        console.log("Error:",error);
    });
}