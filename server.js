let cart=[];
let users=[];

const express=require("express");
const cors=require("cors");
const bcrypt=require("bcryptjs");

const app=express();
const PORT=5000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

let products=[
    {id:1,name:"Wireless Headphones",price:1499},
    {id:2,name:"Smart Phones",price:2999},
    {id:3,name:"Backpack",price:899},
    {id:4,name:"Bluetooth Speaker",price:1299},
];

app.get("/api/products",(req,res)=>{res.json(products);});

//products ko add to card karne ke liye 
app.post("/api/cart/add",(req,res)=>{
    const productId=req.body.productId;
    const product=products.find(p => p.id ===productId);

    if(!product){
        return res.status(404).json({message:"Product not found."});
    }
    cart.push(product);
    res.json({message:"Product is add to the cart",cart:cart});
});

app.get("/api/cart",(req,res)=>{res.json(cart);});
//remove ke liye 
app.post("/api/cart/remove",(req,res)=>{
    const productId=req.body.productId;
    const index=cart.findIndex(item=>item.id===productId);

    if(index !== -1){
        cart.splice(index,1);
    }
    res.json({message:"Product is removed by the cart",cart:cart});
});

//order place ke liye
app.post("/api/checkout",(req,res)=>{
    const address=req.body.address;

    if(!address){
        return res.status(400).json({message:"Address is Compulsory."});
    }
    if(cart.length===0){
        return res.status(400).json({message:"Cart is empty,Order can't be placed."});
    }
    const orderTotal=cart.reduce((sum,item)=>sum + item.price,0);
    const order={
        items:cart,
        total:orderTotal,
        address:address
    };
    cart=[];
    res.json({message:"Order is successfully placed",order:order});
});

//signup ke liye
app.post("/api/signup",async(req,res)=>{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;

    const existingUser=users.find(u=>u.email===email);
    if(existingUser){
        return res.status(400).json({message:"An accouunt with this email already exists."});
    }
    const hashedPassword=await bcrypt.hash(password, 10);

    const newUser={username:username, email:email, password:hashedPassword};
    users.push(newUser);

    res.json({message:"Account created! Please Login now"});
});
//login ke liye
app.post("/api/login",async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const user=users.find(u=>u.email===email);
    if(!user){
        return res.status(400).json({message:"Incorrect Email or Password."});
    }
    const isMatch=await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message:"Incorrect Email or Password."});
    }
    res.json({message:"Login Successful!", username:user.username});
});

app.listen(PORT, ()=>{console.log("Server is working: http://localhost:5000")});
// Naya product add karne ke liye (admin)
app.post("/api/products/add", (req, res) => {
    const name = req.body.name;
    const price = req.body.price;

    const newProduct = {
        id: Date.now(),
        name: name,
        price: price
    };

    products.push(newProduct);
    res.json({ message: "Product added successfully!", products: products });
});

// Product delete karne ke liye (admin)
app.post("/api/products/delete", (req, res) => {
    const productId = req.body.productId;
    const index = products.findIndex(p => p.id === productId);

    if (index !== -1) {
        products.splice(index, 1);
    }
    res.json({ message: "Product deleted successfully!", products: products });
});