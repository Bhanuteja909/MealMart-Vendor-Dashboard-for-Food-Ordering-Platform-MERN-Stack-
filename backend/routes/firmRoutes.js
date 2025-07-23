const express = require("express");
const firmController = require("../controller/firmController");
const verifyToken=require("../middlewares.js/verifyToken");

const router = express.Router();


router.post("/add-firm",verifyToken,firmController.addFirm);
//verifytoken acts as middle ware and if success executes add firm function

router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});

router.delete('/:firmId',firmController.deleteFirmById);


module.exports = router;