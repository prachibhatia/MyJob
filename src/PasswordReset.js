import React from 'react'
import Header from './Header'
import { useHistory } from 'react-router';

const PasswordReset = () => {
   const history = useHistory();

    const submit = (e)=>{

        e.preventDefault();
        var password = document.getElementById("password").value;
        var confirmpassword = document.getElementById("confirmpassword").value;
        var token = localStorage.getItem("token");
        const res = fetch("https://jobs-api.squareboat.info/api/v1/auth/resetpassword",{
            method:"POST",
            headers:{
                 "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                "password":password,
                "confirmPassword":confirmpassword,
                "token":token
            })
        }).then(res => res.json())
        .then(resp=>{
            //console.log(resp);
            if(resp.success==true){
                history.push('./login');
            }
            else{
                    document.getElementById("errormsg").textContent = resp.message;
                    document.getElementById("password").style.border = "1px solid #FF333380";
                    document.getElementById("confirmpassword").style.border = "1px solid #FF333380";
            }
        }  
        )
    }

    return (
        <div>
        <Header/>
       <div className="password-reset-box">
       <p>Reset your password</p>
       <div style={{fontSize:"14px",fontFamily:"Helvetica Neue",marginLeft:"30px"}}>Enter your password below</div>
       <form>
      <div className="form-control">
        <label>New Password</label>
        <input type="password" placeholder="Enter your password" id="password"></input>
        </div>
        <div className="form-control">
        <label>Confirm new Password</label>
        <input type="password" placeholder="Enter your password" id="confirmpassword"></input>
        </div>
        <div className="errormsg-password-reset" id="errormsg"></div>
        <button className="btn-submit" onClick={submit}>Reset</button>
        </form>
         </div>
        </div>
    )
}

export default PasswordReset
