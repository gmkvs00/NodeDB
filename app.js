const express=require("express");
const mongoose=require("mongoose");
const fs=require("fs");
const users=require("./Student_data.json");
const { render } = require("ejs");
const app= express();

//connection
mongoose.connect('mongodb://127.0.0.1:27017/Gaurav').then(()=>console.log("mongodb connected"))
//schema
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
    },
    jobTitle:{
        type:String,
    },
    gender:{
      type:String,
    },
},{timestamps:true})

const User=mongoose.model("user",userSchema);
//Routs
app.set('view engine','ejs');
//middleware
app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{
    console.log("hello middleware");
   fs.appendFile("log.txt",`${Date.now()}:${req.method}:${req.path}\n`,(err,data)=>{
    next();
   });
   
})

app.get("/",(req,res)=>{
    return res.render("index.ejs");
})
app.get("/users",async(req,res)=>{
    const allDbUsers=await User.find({});
    const html=`
    <ul>
    ${allDbUsers.map((user)=>
       `<li>${user.firstName}</li>
       --${user.email}`
    ).join("")}
    </ul>
    `
    res.send(html);
})
//rest api
app.get("/api/users",async(req,res)=>{
    const allDbusers=await User.find({});
    return res.json(allDbusers);
});
//routs to api
app.route("/api/users/:id")
.get((req,res)=>{
    
    const id=Number(req.params.id);
    const user=users.find((user)=> user.id==id);
    return res.json(user);
})
.patch((req,res)=>{
   //edit user with id
   return res.json({})
})
.delete((req,res)=>{
// delete user
return res.json({})
})


app.post('/api/users',async(req,res)=>{
    //edit user to edit 
    const body=req.body;
    
    const result=await User.create({
        firstName:body.firstName,
        lastName:body.lastName,
        email:body.email,
        jobTitle:body.jobTitle,
        gender:body.gender
    });
    console.log(result);
    return res.status(201).json({msg:"sucess"})
})
app.patch('/api/users/:id',(req,res)=>{
  //to edit
})

app.delete("/api/users/:id",(req,res)=>{
 // to delete
})

const PORT = 8000;

app.listen(PORT,()=>{
    console.log(`server connected at port http://localhost:${PORT}`);
    });