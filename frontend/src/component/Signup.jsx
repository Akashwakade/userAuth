import { useState } from "react"

const Signup=()=>{
    const[email,setEmail]=useState("")
    const[pass,setPass]=useState("")
    const[location,setLocation]=useState("")

    //function to handle submit
    const handleSubmit=()=>{
        const payload={
            email:email,
            pass:pass,
            location:location
        }
        console.log(payload)
        fetch("http://localhost:8080/user/register",{
           method: "POST",
           headers:{"Content-type":"application/json"},
           body:JSON.stringify(payload)

        })
        .then(res=>res.json())
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
return(
    <div>
        {/* what are different thing we need */ }
        <h1>Registration Page</h1>
      Email:  <input type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
       Password: <input type="password" value={pass}placeholder="Enter password" onChange={(e)=>setPass(e.target.value)}/>
      Location:  <input type="location" value={location}placeholder="where are you from"onChange={(e)=>setLocation(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      
    </div>
)
}

export {Signup}
//now add this inside app.js