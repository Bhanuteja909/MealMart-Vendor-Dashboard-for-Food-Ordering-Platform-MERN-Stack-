import React from 'react'

const NavBar = ({showloginHandler,showRegisterHandler,showLogOut,logOutHandler}) => {
   
  const firmName=localStorage.getItem('firmName');

  return (
     <div className="navsection">

          <div className="company">
            Vendor Dashboard
          </div>
          <div className="firmName">
              <h4>Firmname : {firmName}</h4>
          </div>
          <div className="userAuth">
            {!showLogOut 
            ?
            <>
            <span onClick={showloginHandler}>Login / </span>
            <span onClick={showRegisterHandler}>Register</span>
            </>
            :
            <span onClick={logOutHandler} >Logout</span>}
 
                
            </div>


     </div>
  )
}

export default NavBar