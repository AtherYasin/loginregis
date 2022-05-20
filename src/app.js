const express = require("express")
const app = express();
require("./db/conn.js")
const RegistrationData = require("./models/registers")
const port = process.env.PORT || 3500;
const path = require("path")
const hbs = require("hbs")
const bcrypt = require("bcryptjs");

const publicPath = path.join(__dirname,"../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname,"../templates/partials")

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set("view engine", "hbs");
app.set("views", viewPath);
app.use(express.static(publicPath));
hbs.registerPartials(partialPath);



app.get("/",async(req,res)=>{
    res.render("index")
})

app.get("/login",async(req,res)=>{
    res.render("login")
})



app.get("/register",async(req,res)=>{

    
    
    res.render("register")
})

app.post("/register",async(req,res)=>{
    try{
        console.log(req.body.password ,req.body.confirmpassword);
        if(req.body.password !== req.body.confirmpassword) return res.send("your password doesnt match")
        
        
        console.log("post request running");
        // console.log(req.body);
        const myDocument = new RegistrationData(req.body)
        const result = await myDocument.save()
        if(result){

            res.send("you are now registered")
        }else{
            res.send(result)
        }
    }catch(e){
        console.log(e);
        res.send(e)
    }
    
})



app.post("/login",async(req,res)=>{

    try{
        const email = req.body.email;
        const password = req.body.password;

        
        

        const useremail = await RegistrationData.findOne({email:email})

        const isMatch = bcrypt.compare(password,useremail.password)

        if(isMatch){
            // res.send("you are login")
            // res.render("index");
            res.send('you login successfully');
        }else{
            res.send("password is incorrect");
        }
    } catch (Err){
        res.status(400).send("Login Details are incorrect")
    }
    
})

const jwt = require("jsonwebtoken")


const createToken = async ()=>{
    
    const token = await jwt.sign({_id:"62876cfdf3c6f15977977acb"},"mynameisolalakalaboomboombucklulu");
    console.log(token);

    const userVer = await jwt.verify(token,"mynameisolalakalaboomboombucklulu")
    console.log(userVer);
    
}

createToken();

app.listen(port,()=>{
    console.log(`application  running at ${port}`);
})
