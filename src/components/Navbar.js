import React  from 'react'
import { useCartState } from '../components/ContextReducer';
import {Link, useNavigate} from "react-router-dom"
import Badge from 'react-bootstrap/Badge'




const Navbar = () => {


  let data = useCartState();

  const navigate = useNavigate();
  const handelLogout=()=>{
localStorage.removeItem("authToken");
navigate("/login")
  }


  return (
<div>
  <nav className={`navbar navbar-expand-lg bg-cyan-600 fixed-top font-bold text-white`}>
  <div className=" fs-1 fst-italic"  >
  <h1>HealthyDiet</h1>
</div>
  <div  className='d-flex ml-8 me-auto mb-2'>
    <ul className="flex  ">
      <li className=" ml-5 nav-link active "> <Link  to="/">Home</Link></li>
      {(localStorage.getItem("authToken"))?
            <li className=" ml-5 nav-link active "> <Link  to="/">My Orders</Link></li>
:""
      }
    </ul>
    {(!localStorage.getItem("authToken"))?
    <div>
   <Link className=" ml-5 btn bg-white text-success" to="/login">Login</Link>
    <Link  className=" ml-5 btn bg-white text-success" to="/createuser">Signup</Link>
    </div>
    :  
    <div>
    <div className="ml-5 btn bg-white text-success" >My Cart{" "}
    <Badge pill bg="danger">{data.length}</Badge>
    </div>
  
    <div className="ml-5 btn bg-white text-success" onClick={handelLogout}>Logout</div>
    </div>

  }
  </div>
 
</nav>
    </div>
  )
}

export default Navbar
