import React,{useState,useEffect} from 'react'
import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"
import Login from "../components/forms/Login"
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Greetingpage from './greetingpage'
import AllProducts from '../components/AllProducts'
// LandingPage runs first, sets state and passes handler to NavBar
// When Login is clicked, handler updates state, triggering <Login /> to show

const LandingPage = () => {

  const[showlogin,setshowlogin]= useState(true)
  const[showRegister,setShowRegister]=useState(false)
  const[showFirm,setShowFirm]=useState(false)
  const[addproduct,setAddProduct]=useState(false)
  const[showWelcome,setShowWelcome]=useState(false)
  const [showAllProducts, setShowAllProducts] = useState(false);
  const[showLogOut,setShowLgoOut]=useState(false);
  const[showaddFirmHeading,setShowaddFirmHeading]=useState(true);
  const [showInfo, setShowInfo] = useState(false);

const handleShowUserInfo = () => {
if(showLogOut)
{
  setShowInfo(true);
  setShowRegister(false);
  setshowlogin(false);
  setShowFirm(false);
  setAddProduct(false);
  setShowWelcome(false);
  setShowAllProducts(false);
}
else
{
  alert("please Login");
  setShowLogin(true);
}

};




  useEffect(()=>{
    const loginToken=localStorage.getItem('loginToken');
    if(loginToken){
        setShowLgoOut(true);
    }
  },[])

  useEffect(()=>{
    const firmNameFromLocalStorage=localStorage.getItem('firmName');
    if(firmNameFromLocalStorage)
    {
        setShowaddFirmHeading(false);
        
    }
    else
    {
      setShowaddFirmHeading(true);
    }
       
  },[])

 
  

  const logOutHandler=()=>{
    alert("Are you sure you want to logout?");
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName");
    localStorage.removeItem("vendor name")
    localStorage.removeItem("vendor email")
    setShowLgoOut(false);
    setShowaddFirmHeading(true);
    setShowWelcome(false);
 
  }

 
    const showloginHandler=()=>{
      setshowlogin(true)
      setShowRegister(false)
      setShowFirm(false)
       setAddProduct(false)
      setShowWelcome(false)
      setShowAllProducts(false)
      setShowInfo(false)
      

    }
    
     const showRegisterHandler=()=>{
      setShowRegister(true)
       setshowlogin(false)
      setShowFirm(false)
       setAddProduct(false)
      setShowWelcome(false)
      setShowAllProducts(false)


    }

    const ShowFirmHandler=()=>{

       
      if(showLogOut)
      {
        setShowRegister(false)
       setshowlogin(false)
       setShowFirm(true)
        setAddProduct(false)
      setShowWelcome(false)
      setShowAllProducts(false)
      }
      else
      {
        alert("Please Login")
        setshowlogin(true);
         setShowRegister(false); 
      }


    }
     const ShowAddProduct=()=>{
      if(showLogOut)
      {
      setShowRegister(false)
       setshowlogin(false)
       setShowFirm(false)
       setShowWelcome(false)
       setAddProduct(true)
       setShowAllProducts(false)
      }
      else
      {
        alert("Please Login")
        setshowlogin(true);
         setShowRegister(false);
      }

    }
     const showWelcomehandler=()=>{
      setShowRegister(false)
       setshowlogin(false)
       setShowFirm(false)
       setAddProduct(false)
       setShowWelcome(true)
       setShowAllProducts(false);
    }

    const showAllProductsHandler = () => {
      if(showLogOut)
      {
      setshowlogin(false);
      setShowRegister(false);
      setShowFirm(false);
      setAddProduct(false);
      setShowWelcome(false);
      setShowAllProducts(true);
      }
      else
      {
        alert("Please Login")
        setshowlogin(true);
        setShowRegister(false);
      }
};


  
  return (
    <>
         <section className="landingSection">
                  <NavBar showloginHandler={showloginHandler} showLogOut={showLogOut} showRegisterHandler={showRegisterHandler}
                   logOutHandler={logOutHandler}
                  />

                  <div className="collectionsection">

                      <SideBar showAllProductsHandler={showAllProductsHandler}  ShowFirmHandler={ShowFirmHandler} ShowAddProduct={ShowAddProduct} showaddFirmHeading={showaddFirmHeading} handleShowUserInfo={handleShowUserInfo}/>
                      {showlogin && <Login showWelcomehandler={showWelcomehandler}/>}
                      {showRegister && <Register showloginHandler={showloginHandler}/>}
                      {showFirm &&  showLogOut && <AddFirm/>} 
                      {addproduct && showLogOut && <AddProduct/>}
                      {showWelcome &&  <Greetingpage/>}
                      {showAllProducts && showLogOut && <AllProducts showAllProductsHandler={showAllProductsHandler} />}

                    {showInfo && (
                    <div className="userinfo">
                      <h2>User Details</h2>
                      <p><strong>Vendor Name:</strong> {localStorage.getItem('vendor name')}</p>
                      <p><strong>Email:</strong> {localStorage.getItem('vendor email')}</p>
                    </div>
                  )}

                  </div>  
         </section>
    </>
  )
}

export default LandingPage