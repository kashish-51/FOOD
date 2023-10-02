import React,{useState} from 'react'
import {Link, useNavigate} from "react-router-dom"


function Login() {
  const [credentials, setcredentials] = useState({password:"",email:""})
let navigate= useNavigate();
const handlesubmit= async (e)=>{

e.preventDefault()                                                           //synthetic event  prevents all the default behavior by the browser.
 const response = await fetch("http://localhost:5000/api/loginuser", {
  method:'POST',
  headers:{
    'content-type':'application/json'
  },
  body:JSON.stringify({ password:credentials.password,email:credentials.email})// to send data in backend
 });

 const json = await response.json()
 console.log(json);
if(!json.success){
  alert("Enter Valid Credentials")
}

if(json.success){
  localStorage.setItem("authToken",json.authToken);  //to save the authkon in local storage
  console.log(localStorage.getItem("authToken"))
  navigate("/")                //as soon as user login with correct credentials they will be directed to home page
}


}
const onChange=(event)=>{  //this func. is used to make user type in input fields
  setcredentials({...credentials,[event.target.name]:event.target.value})
}

  return (
    <div>
      <div className="container">
   <form onSubmit={handlesubmit}>
  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email}   onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/createuser" className="m-3 btn btn-danger">Are u a new user?</Link>
</form>
</div>
    </div>
  )
}

export default Login
