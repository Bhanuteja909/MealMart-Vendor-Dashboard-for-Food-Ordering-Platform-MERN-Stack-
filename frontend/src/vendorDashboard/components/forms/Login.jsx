import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';

const Login = ({ showWelcomehandler }) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
const handlelogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${API_URL}/vendor/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log(data.vendorId);

    if (!response.ok) {
      alert(data.error || "Login failed");
      return;
    }

    alert("vendor login frontend  successfully");
    localStorage.setItem('loginToken', data.token);
     

    // Make sure vendorId exists
    if (!data.vendorId) {
      alert("Vendor ID not found in response");
      return;
    }

    // Get vendor details
    const vendorId = data.vendorId;
    const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
    const vendorData = await vendorResponse.json();
    console.log("vendor response is:"+vendorResponse);
    console.log("Vendor Data:", vendorData);

    if (vendorResponse.ok || vendorResponse.firmId==null) {
      console.log("Entered if block");
      const vendorName = vendorData.username;
      const vendoremail = vendorData.email;
      localStorage.setItem('vendor name', vendorName);
      localStorage.setItem('vendor email', vendoremail);
      window.location.reload();

      if (vendorData.firm && vendorData.firm.length > 0) {
        const vendorFirmId = vendorData.firm[0]._id;
        const vendorFirmName = vendorData.firm[0].firmname;
        localStorage.setItem('firmId', vendorFirmId);
        localStorage.setItem('firmName', vendorFirmName);
         window.location.reload();
        
      } else {
        
        showWelcomehandler && showWelcomehandler();
      }
    } else {
      alert(vendorData.error+"from frontendjsx" || "Could not fetch vendor details");
    }
  } catch (error) {
    console.error("login failed", error);
    alert("login failed ");
  }
}
  return (
    <div className="loginSection">
      <form className='loginform' onSubmit={handlelogin} >
        <h3>Vendor Login</h3>
        <label>Email</label><br />
        <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' /><br /><br />
        <label>Password</label><br />
        <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Enter your password' /><br /><br />
        <div className="btnsubmit">
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login