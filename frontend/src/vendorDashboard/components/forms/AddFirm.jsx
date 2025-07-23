import React,{useState} from 'react'
import {API_URL} from '../../data/apiPath';

const AddFirm = () => {

    const [firmName,setFirmName]=useState("");
    const [area,setArea]=useState("");
    const [category,setCategory]=useState([]);
    const [region,setRegion]=useState([]);
    const [offer,setOffer]=useState("");
    const [file,setFile]=useState(null);

    const handleCategoryChange =(event)=>{
        const value=event.target.value;
        if(category.includes(value)){
            setCategory(category.filter((item)=>item !== value));
        }
        else
        {
            setCategory([...category,value])
        }
    }

    const handleRegionChange =(event)=>{
        const value=event.target.value;
        if(region.includes(value)){
            setRegion(region.filter((item)=>item !== value));
        }
        else
        {
            setRegion([...region,value])
        }
    }

    const handleImageUpload =(event)=>{
        const selectedImage =event.target.files[0];
        setFile(selectedImage)
    }

    const handleFirmSubmit = async(e)=>{
        e.preventDefault();
        try 
        {
            const loginToken = localStorage.getItem('loginToken');

            if(!loginToken)
            {
                console.error("Token not found or user not authenticated");
                return;
            }
                 

            const formData = new FormData();
            formData.append('firmname',firmName)
            formData.append('area',area)
            formData.append('offer',offer)
            formData.append('image',file)

            category.forEach((value)=>{
                formData.append('category',value)
            })
            region.forEach((value)=>{
                formData.append('region',value)
            })

            const response =await fetch(`${API_URL}/firm/add-firm`,{
                method:`post`,
                headers:{
                    'token':`${loginToken}`
                },
                body:formData
            });
            const data=await response.json()

            if(response.ok)
            {
                console.log(data);
                alert("Firm added Successfully");
                setFirmName("");
                setArea("");
                setCategory([]);
                setRegion([]);
                setOffer("");
                setFile(null);
            }
            else if (data.message === "vendor can have only one firm")
            {
                alert("Firm exist only 1 firm can added");
            }
            else{
                alert('failed to add firm');
            }
             
            const firmId=data.firmId;
            localStorage.setItem('firmId',firmId)
                
        } 
        catch (error) 
        {
            console.error("Failed to add firm");
        }
    }

    

  return (
 <div className="firmsection">
     <form className="tableform" onSubmit={handleFirmSubmit}>
        <h3>Add Firm </h3>
        <label>Firm Name</label> 
        <input type="text" name="firmname" value={firmName} onChange={(e)=>setFirmName(e.target.value)}></input>  
         <label>Area </label> 
        <input type="text" name="area" value={area} onChange={(e)=>setArea(e.target.value)}></input> 
         
        <div className="checkInp">
                <label id="innercheckInp">Category
                </label>
                <div className="inner2">
                        <div className="checkboxcontainer">
                        <label>Veg</label>
                        <input type="checkbox" checked={category.includes('veg')} onChange={handleCategoryChange} value="veg"/>

                    </div>

                    <div className="checkboxcontainer">
                        <label>Non-Veg</label>
                        <input type="checkbox"  checked={category.includes('non-veg')} onChange={handleCategoryChange}  value="non-veg" />
                    </div>
                </div>
                 
        </div> 
         

         <div className="regioncheckInp">
                <label id="regioninnercheckInp">Region
                </label>
                <div className="regioninner2">

                    <div className="regioncheckboxcontainer">
                        <label>South Indian</label>
                        <input type="checkbox" checked={region.includes('south-indian')} value="south-indian" onChange={handleRegionChange}/> 
                    </div>

                    <div className="regioncheckboxcontainer">
                        <label>North Indian</label>
                        <input type="checkbox" value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange} />
                    </div>
                     <div className="regioncheckboxcontainer">
                        <label>Chinese</label>  
                        <input type="checkbox" value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange} />
                    </div>
                     <div className="regioncheckboxcontainer">
                        <label>Bakery</label>
                        <input type="checkbox" value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange} />
                    </div>

                </div>
                 
        </div> 


         
         <label >Offer</label> 
        <input type="text" name="offer" value={offer} onChange={(e)=>setOffer(e.target.value)}></input> 
         <label>Firm Image</label> 
        <input type="file" onChange={handleImageUpload} ></input> 
    <div className="btnsubmit">
        <button type="submit">Submit</button>
    </div>
     </form>
 </div>
)
}

export default AddFirm