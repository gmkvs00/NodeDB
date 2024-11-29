const User=require("../models/user")

async function handleGetUsers(req,res){
    const allDbusers=await User.find({});
    return res.json(allDbusers);
}

async function handleGetUserById(req,res){
    const user= await User.findById(res.params.id);
    if(!user) return res.status(404).json({error:"user not found"});
    return res.json(user);
}

async function handleUpdateUserById(req,res){
    await User.findByUdAndUdate(req.params.id,{lastName:"change"});
    return res.json({status:"sucess"});
}

async function handleDeleteById(req,res){
    await User.findByIdAndDelete(req.params.id);
   return res.json({status:"sucess"});
}
async function handleCreateNewUser(req,res){
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
}
module.exports={
    handleGetUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteById,
    handleCreateNewUser,
}