import React from 'react'
import Header from './Header'
import { useState } from 'react'
import { useHistory } from 'react-router';

export const Forgot = () => {

    const [email,setEmail] = useState("");
    const history = useHistory();

    const submit = (e)=>{
        e.preventDefault();
        const res = fetch(`https://jobs-api.squareboat.info/api/v1/auth/resetpassword?email=${email}`,{
            method:"Get",
            headers:{
                 "Content-Type" : "application/json"
            }
        }).then(res => res.json())
        .then(resp=>{
            if(resp.success==true){
                localStorage.setItem("token",resp.data.token);
                setEmail("");
                verify();
            }
            else{
                console.log(resp);
                document.getElementById("errormsg").textContent = resp.message;
                document.getElementById("input").style.border = "1px solid #FF333380";
                setEmail("");
            }
        }
        )
    }

    const verify = ()=>{
        const res1= fetch(`https://jobs-api.squareboat.info/api/v1/auth/resetpassword/${localStorage.getItem("token")}`,{
                method:"Get",
                headers:{
                    "Content-Type" : "application/json"
               }
            }).then(history.push('./ResetPassword'))
    }
     
    return (
        <div>
          <Header/>
       <div className="forgot-box">
      <p>Forgot your password ?</p>
      <div>Enter the email associated with your account and we’ll send you instructions to reset your password.</div>
      <form>
      <div className="form-control1">
        <label>Email address</label>
        <input type="text" id="input" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} ></input>
        <div className="errormsg" id="errormsg"></div>
        </div>
        <button className="btn-submit" onClick={submit}>Submit</button>
        </form>
    </div>
        </div>
    )
}
