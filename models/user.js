const mongoose = require('mongoose');

// Define the schema
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
},{timestamps:true});

const User=mongoose.model("user",userSchema);

module.exports=User;