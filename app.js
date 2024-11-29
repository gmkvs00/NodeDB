const express=require("express");

const { connectMongoDb }= require('./connection');

const userRouter=require("./routes/users");

const { logReqRes }=require("./middlewares")

const { render } = require("ejs");
const app= express();

connectMongoDb('mongodb://127.0.0.1:27017/Gaurav').then(()=>{console.log("mongo db connected")});


//middleware
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"));

//user routs
app.use("/api/user",userRouter);

//server port
const PORT = 8000;
app.listen(PORT,()=>{
    console.log(`server connected at port http://localhost:${PORT}`);
    });