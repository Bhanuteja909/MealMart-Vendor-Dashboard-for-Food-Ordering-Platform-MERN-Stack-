//logic to store data in DB

const Vendor =require("../models/Vendor");
const jwt =require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const dotenv=require("dotenv");

dotenv.config();
const secretkey=process.env.secretkeyhide;

const VendorRegister = async(req,res)=>
{
    const{username, email,password}=req.body;   //means you're extracting the username, email, and password values from a request body (req.body) using object destructuring in JavaScript.This is a cleaner and shorter way to access form data sent from the frontend, typically in a POST request.

    try
    {
        const vendorEmail=await Vendor.findOne({email});
        if(vendorEmail)
        {
            return res.status(400).json("email already takem");
        }
        const hashedpassword=await bcrypt.hash(password,10);

        const newVendor =new Vendor({
            username,
            email,
            password:hashedpassword
        });
        await newVendor.save();

        res.status(201).json({message:"Vendor Registered Successfully"});
        console.log("Registered");
    }
    catch(error)
    {
        console.error(error);
          res.status(500).json({error:"Internal server error"});
    }
}


const vendorLogin = async(req, res)=>{
     const {email, password} = req.body;
     try{
        const vendor=await Vendor.findOne({email});
        
        if(vendor==null || (await bcrypt.compare(password,vendor.password))==false )
        {
              return res.status(401).json({error:"Invalid username or password"});
        }
        const token = jwt.sign({vendorId: vendor._id},secretkey, {expiresIn:"1h"}); //creating vendor token for security 
       
        const vendorId=vendor._id;

        res.status(200).json({success:"login backend Successfully",token,vendorId});
        console.log(email,"token is ",token);
     }
     catch{
        console.log("Error in email or password");
     }

}
    
const getAllVendors =async(req,res)=>{
    try
    {
         const vendors=await Vendor.find().populate('firm'); //extract all vendor records and in that  add s firm details by replacing firm ID
         res.json({vendors});
    } 
    catch (error) {
        console.log(error);
          res.status(500).json({error:"Internal server error"});
        
    }
}

const getVendorById = async (req, res) => {
    const vendorId = req.params.vendorId; 

    try {
        const vendor = await Vendor.findById(vendorId).populate("firm");
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        // Only log firmId if it exists
        if (vendor.firm && vendor.firm.length > 0) {
            const vendorFirmId = vendor.firm[0]._id;
            console.log(vendorFirmId+"from backend vendorfirm id is:");
        }
        // Always send vendor data, even if firm is empty
        res.status(200).json(vendor);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}


// const getVendorBasicInfo = async (req, res) => {
//   const vendorId = req.params.id;

//   try {
//     const vendor = await Vendor.findById(vendorId).select('username email');

//     if (!vendor) {
//       return res.status(404).json({ error: 'Vendor not found' });
//     }

//     res.status(200).json(vendor); // returns only username and email
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

 



module.exports = {VendorRegister, vendorLogin,getAllVendors,getVendorById};
 