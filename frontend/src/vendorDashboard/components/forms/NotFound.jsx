import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
        <div className='errorSection'> 
        <h1>404</h1>
        <div> Page Not Found</div>
        <Link to="/" style={{fontSize:'4vh'}}  >
         <p>Go Back</p>
        </Link>
    </div>

    </>
 

  )
}

export default NotFound