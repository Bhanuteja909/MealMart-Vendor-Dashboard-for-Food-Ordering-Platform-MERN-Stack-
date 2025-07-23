import React,{useState,useEffect} from 'react'
import { API_URL } from '../data/apiPath';

//"useEffect is used to do something after your component shows up on the screen — like fetching data, updating the title, or logging a message."
const AllProducts = () => {

    const  [products,setProducts]= useState([]);

    const productsHandler = async()=>{
        const firmId=localStorage.getItem('firmId');
        try{
            const response=await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductData = await response.json();
            setProducts(newProductData.products);
            console.log(newProductData);
        }catch(error){
            console.error("Error fetching products:", error);

        }
    }
    useEffect(()=>{
            productsHandler();
            console.log("this is useEffect");
    },[])

    const deleteProductById = async(productId)=>
    {
        try{
            const response =await fetch(`${API_URL}/product/${productId}`,{
                method:'DELETE'
            })
            if(response.ok)
            {
                setProducts(products.filter(product =>product._id !== productId));
                confirm("Are u sure you want to delete");
                alert("Product deleted successfully");
            }
        }
        catch(error){
            console.log('failed to delete product');
        }
    }

  return (
    <div>  
        {!products? (
            <p>No products available</p>
        ):(
            <table className="product_table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price Name</th>
                        <th>Product Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                
                    {products.map((item)=>(
                        
                         <tr key={item._id}>
                            <td>{item.productName}</td>
                            <td>{item.price}</td>
                            <td>
                                {item.image && (
                                    <img src={`${API_URL}/uploads/${item.image}`}
                                    alt={item.productName}
                                    />
                                )}
                            </td>
                            <td>
                                <button className='deletebutton' onClick={()=>deleteProductById(item._id)} >Delete</button>
                            </td>

                            </tr>
                       
                    )
                    )}
                
                </tbody>
            </table>
        )}
    </div>
  )
}

export default AllProducts