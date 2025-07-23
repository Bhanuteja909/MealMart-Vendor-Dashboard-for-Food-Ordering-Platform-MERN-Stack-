const Firm = require("../models/Firm");
const Vendor=require("../models/Vendor");
const multer=require("multer");
const path=require("path");


 const storage=multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"uploads/");

        },
        filename:function(req,file,cb){
            cb(null,Date.now() + path.extname(file.originalname));
        }
    });
    const upload=multer({storage:storage});




const addFirm = async(req,res)=>{
    
    try {
         const { firmname,area,category,region,offer}=req.body;

    const image=req.file? req.file.filename:undefined;

    const vendor = await Vendor.findById(req.vendorId);

    if(!vendor)
    {
        return res.status(404).json({message:"Vendor not found"});
    }

    if(vendor.firm.length > 0)
   {
    return res.status(400).json({message:"vendor can have only one firm"});
   }

    const firm =new Firm({
        firmname,area,category,region,offer,image,vendor: vendor._id
    })
 
   const savedFirm = await firm.save();  //This saves a new firm to the Firm collection in MongoDB.
   vendor.firm.push(savedFirm); // saving savedFirm object to vendor table
   await vendor.save();//saving object in vendor table

   const firmId=savedFirm._id;

    

    return res.status(200).json({message:"Firm added successfully",firmId});
        
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error");
    }

}


const deleteFirmById=async(req,res)=>
{
    try{
        const firmId=req.params.firmId;
        const deletedFirm=await Firm.findByIdAndDelete(firmId);
        if(!deletedFirm)
            return res.status(404).json({error:"No Firm found"});

          res.status(200).json({success:"Firm Deleted"});

    }
    catch(error)
    {
  console.error(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

module.exports ={addFirm:[upload.single("image"),addFirm],deleteFirmById};