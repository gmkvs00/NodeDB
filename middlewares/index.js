const fs=require("fs");

function logReqRes(filename){
     return (req,res,next)=>{
        console.log("hello middleware");
        fs.appendFile("log.txt",`${Date.now()}:${req.method}:${req.path}\n`,(err,data)=>{
         next();
        });
     }
}

module.exports={
    logReqRes,
}