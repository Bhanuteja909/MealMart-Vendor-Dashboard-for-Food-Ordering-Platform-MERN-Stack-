import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';

export const AddProduct = () => {

    const [productName,setProductName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState([]);
    const [bestseller,setBestSeller]=useState(false);
    const [image,setImage]=useState(null);
    const [description,setDescription]=useState("");

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

    const handleBestSeller = (event)=>{
        const value=event.target.value === 'true';
        setBestSeller(value);

    }
    const handleImageUpload =(event)=>{
        const selectedImage =event.target.files[0];
        setImage(selectedImage)
    }
    const handleAddProduct =async(e) =>{
         e.preventDefault()

         try{
            const firmId=localStorage.getItem('firmId');
            const loginToken=localStorage.getItem('loginToken');

            if(!loginToken || !firmId){
                console.log("user not authenticated");
                alert("Please login first")
                return;
            }

            const formData = new FormData();
            formData.append('productName',productName)
            formData.append('price',price)
            formData.append('bestseller', bestseller ? 'true' : 'false');
            formData.append('description',description)
            formData.append('image',image)

            category.forEach((value)=>{
                formData.append('category',value)
            })
            
        const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
            method:'POST',
            body:formData
        });
        const data= await response.json();

        if(response.ok){
            alert('Product added successfully');
            setProductName("");
            setPrice("");
            setCategory([]);
            setBestSeller(false);
            setImage(null);
            setDescription("");
        }

         }catch(error){
            console.log("failed to add product",error.message);
            alert(`Failed to add product`);
         }
    }


  return (
    <div className="addproductsection">

                <form className="tableform" onSubmit={handleAddProduct}>
                        <h3>Add Product </h3>
                        <label>Product Name</label> 
                        <input type="text" value={productName}  onChange={(e)=>setProductName(e.target.value)} />  
                        <label>Price</label> 
                        <input type="text" value={price}  onChange={(e)=>setPrice(e.target.value)} /> 
                        <label>Categorey</label> 
                        
                        <div className="regioninner2">

                     
                    <div className="regioncheckboxcontainer">
                        <label>Veg</label>
                        <input type="checkbox" value="Veg" checked={category.includes('Veg')} onChange={handleCategoryChange} />
                    </div>
                    <div className="regioncheckboxcontainer">
                        <label>Non_Veg</label>
                        <input type="checkbox" value="Non-veg" checked={category.includes('Non-veg')} onChange={handleCategoryChange} />
                    </div>

                </div>
                        <label>Bestseller</label> 
                 <div className="regioninner2">

                     
                    <div className="regioncheckboxcontainer">
                        <label>Yes</label>
                        <input type="radio" value="true" checked={bestseller===true } onChange={handleBestSeller} />
                    </div>
                     <div className="regioncheckboxcontainer">
                        <label>No</label>
                        <input type="radio" value="false" checked={bestseller===false} onChange={handleBestSeller} />
                    </div>

                </div>
                        <label>Description</label> 
                        <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} /> 

                        <label>Product Image</label> 
                        <input type="file" name="image" onChange={handleImageUpload} /> 
                    <div className="btnsubmit">
                    <button type="submit">Submit</button>
                    </div>
            </form>

    </div>
  )
}


export default AddProduct