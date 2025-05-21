const userModel = require("../models/userModel");

const loginController = async(req,res)=>{

    try{

    const {email, password} = req.body;

    const user = await userModel.findOne({email,password});

    if(!user){
        res.status(404).json("User not found");
    }
    res.status(200).json({
        success:true,
        user
    });

} catch(err){
    res.status(40).json(err);
}

}

const registerController = async(req,res)=>{

   try{
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(200).json({
        success: true,
        newUser
    });
   } catch(err){
    req.status(400).json(err);
   }



}

module.exports = {loginController, registerController};