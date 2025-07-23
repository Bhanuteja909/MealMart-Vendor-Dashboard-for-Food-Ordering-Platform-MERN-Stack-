const Vendor = require('../models/Vendor');
const jwt=require("jsonwebtoken");
const dotEnv=require("dotenv");

dotEnv.config();

const secretkey=process.env.secretkeyhide;

const verifyToken =async(req,res,next)=>{
    const token=req.headers.token;

    if(!token){
        return res.status(401).json({error:"Token is required"});

    }
    try{
        const decode=jwt.verify(token,secretkey);//Decode the Token
        const vendor = await Vendor.findById( decode.vendorId); //we get reference of that object 
         
        console.log(vendor);

        if(!vendor){
            return req.status(404).json({error:"vendor not found"});
        }
       
        req.vendorId= vendor._id;//replacing refrence with orginal id

        next()
    }
    catch(error){
         console.error(error)
         return res.status(500).json({error:"invalid token"});
    }
}
module.exports=verifyToken;
