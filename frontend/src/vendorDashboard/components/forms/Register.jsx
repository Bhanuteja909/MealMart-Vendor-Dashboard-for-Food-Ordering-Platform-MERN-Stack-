import React,{useState} from 'react'
import {API_URL} from '../../data/apiPath';
 

const Register = ({showloginHandler}) => {

  const[username,setUsername]=useState("");
  const[email,setEmail]=useState("");
  const[password,setpassword]=useState("");
  // const[error,setError]=useState("");
  // const[loading,setLoading]=useState("true");

  const handleSubmit=async(e)=>{
    e.preventDefault();//to avoid page refresh when submit

    try{
    const response = await fetch(`${API_URL}/vendor/register`,{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body :JSON.stringify({username,email,password})
    })

    const data=await response.json()
    if(response.ok)
    {
      console.log("data");
      alert("vendor registered successfully");
        setUsername("");
        setEmail("");
        setpassword("");
        alert("Vendor registered successful");
        showloginHandler();

    }
  }catch(error){
        console.error("registration failed",error);
        alert("registration failed");
  }
  }
   

  return (
       <div className="registersection">
        <form className='loginform ' onSubmit={handleSubmit}>
            <h3>Vendor Register</h3>
             <label>User Name</label><br/>
            <input type="text" name="username" value={username}  onChange={(e)=>setUsername(e.target.value)} placeholder='Enter your Username'/><br/><br/>
            <label>Email</label><br/>
            <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email'/><br/><br/>
            <label>Password</label><br/>
            <input type="password" name="password" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='Enter your password'/><br/><br/>
            <div className="btnsubmit">
            <button type='submit'>Submit</button>
            </div>
        </form>
       </div>
  )
}

export default Register