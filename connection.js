const mongoose=require("mongoose");

async function connectMongoDb(url){
    //connection
mongoose
.connect(url)
.then(()=>console.log("mongodb connected"));
}

module.exports={
    connectMongoDb
}