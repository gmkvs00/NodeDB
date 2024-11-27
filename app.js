const express=require("express");
// const connectDB=require("./config/data");
const fs=require("fs");
const users=require("./Student_data.json");
const { render } = require("ejs");
const app= express();
//data base connection failed
// const dotenv=require("dotenv");
// dotenv.config();

// connectDB();
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
app.get("/users",(req,res)=>{
    const html=`
    <ul>
    ${users.map((user)=>
       `<li>${user.first_name}</li>
       <li>${user.id}</li>`
    ).join("--")}
    </ul>
    `
    res.send(html);
})
//rest api
app.get("/api/users",(req,res)=>{
    return res.json(users);
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


app.post('/api/users',(req,res)=>{
    //edit user to edit 
    const body=req.body;
    users.push({...body,id: users.length+1});
    fs.writeFile("/Student_data.json",JSON.stringify(users), (err,data)=>{
        return res.json({status:"pandaing"});
    });
    
})
app.patch('/api/users/:id',(req,res)=>{
  //to edit
})

app.delete("/api/users/:id",(req,res)=>{
 // to delete
})

const PORT = 8000;

app.listen(PORT,()=>{console.log("server connected at port")});