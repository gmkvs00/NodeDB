const express = require("express");

const router = express.Router();

const { handleGetUsers, 
    handleGetUserById, 
    handleUpdateUserById,
     handleDeleteById,
      handleCreateNewUser } = require("../controllers/controller");

// router.get("/",async(req,res)=>{
//     const allDbUsers=await User.find({});
//     const html=`
//     <ul>
//     ${allDbUsers.map((user)=>
//        `<li>${user.firstName}</li>
//        --${user.email}`
//     ).join("")}
//     </ul>
//     `
//     res.send(html);
// })


//rest api
router.route("/")
    .get(handleGetUsers).post(handleCreateNewUser);

router.route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteById)


module.exports = router;