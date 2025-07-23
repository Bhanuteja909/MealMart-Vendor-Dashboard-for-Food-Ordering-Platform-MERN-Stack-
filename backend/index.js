const express=require("express");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const vendorRoutes=require("./routes/vendorRoutes");
const bodyParser=require("body-parser");
const firmRoutes =require("./routes/firmRoutes");
const productRoutes=require("./routes/productRoutes");
const path=require("path");
const cors = require("cors");

const app=express()  //app is now an instance of the Express server.You can use app to define routes, middleware, and to start the server.
app.use(cors());

const PORT=4000;

dotenv.config();  //to use .env data

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Successfully DB Connected"))
 .catch((error)=>console.log(error));


app.use(bodyParser.json());
app.use("/vendor",vendorRoutes); //For any request that starts with /vendor, go check the vendorRoutes file (i.e., vendorroutes.js) for what to do next.
app.use("/firm",firmRoutes);
app.use("/product",productRoutes);
app.use("/uploads",express.static('uploads'));

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})

app.use('/home',(req,res)=>{
    res.send("<h1>Welcome home")
})