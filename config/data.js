const mongoose=require("mongoose");

const MONGO_URL="mongodb://localhost:2707/Gaurav";

const connectDB=async ()=>{
    try{
         await mongoose.connect(MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true

         });
         console.log("connected");
    }
    catch(error){
        console.log("error occurd",error.message);
        process.exit(1);

    }
}

module.exports=connectDB;