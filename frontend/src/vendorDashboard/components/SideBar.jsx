import React from 'react'

const SideBar = ( {ShowFirmHandler,ShowAddProduct,showAllProductsHandler,showaddFirmHeading,handleShowUserInfo}) => {

 
  return (
    <div className="sideBarSection">
        <ul>

        {showaddFirmHeading ?<li onClick={ShowFirmHandler}>Add Firm</li>:""}
          
             
            <li onClick={ShowAddProduct}>Add Product</li>
            <li onClick={showAllProductsHandler}>All Products</li>
            <li onClick={handleShowUserInfo}>User Details</li>
        </ul>
    </div>
  )
}

export default SideBar