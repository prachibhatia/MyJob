import React from 'react'
import Header from './Header'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'

const Content = () => {

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const history = useHistory();

    const signin = (e) =>{

        e.preventDefault();
        const res = fetch("https://jobs-api.squareboat.info/api/v1/auth/login",{
            method:"POST",
            headers:{
                 "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                "email":email,
                "password":password
            })
        }).then(res => res.json())
        .then(resp=>{
            console.log(resp);
            setEmail("");
            setpassword("");
            if(resp.success==true){
              localStorage.setItem("token",resp.data.token);
              history.push('./myjobs');
            }
            else{
              if(resp.code=="401"){
              document.getElementById("errormsg").textContent = "";
              document.getElementById("emailerror").textContent = "";
             document.getElementById("input").style.border = "1px solid #43AFFF";
             document.getElementById("inputbox").style.border = "1px solid #43AFFF";
             document.getElementById("errormsg").textContent = "Invalid email address or password";
             document.getElementById("input").style.border = "1px solid #FF333380";
             document.getElementById("inputbox").style.border = "1px solid #FF333380";
              }
              else{
              if(resp.errors.length==1){
                  if(resp.errors[0].email){
                    document.getElementById("errormsg").textContent = "";
                    document.getElementById("emailerror").textContent = "";
                    document.getElementById("input").style.border = "1px solid #43AFFF";
                    document.getElementById("inputbox").style.border = "1px solid #43AFFF";
                    document.getElementById("emailerror").textContent = resp.errors[0].email;
                    document.getElementById("input").style.border = "1px solid #FF333380";
                  }
                  else{
                    document.getElementById("errormsg").textContent = "";
                    document.getElementById("emailerror").textContent = "";
                    document.getElementById("input").style.border = "1px solid #43AFFF";
                    document.getElementById("inputbox").style.border = "1px solid #43AFFF";
                    document.getElementById("errormsg").textContent = resp.errors[0].password;
                    document.getElementById("inputbox").style.border = "1px solid #FF333380";
                  }
              }
              else{
                document.getElementById("errormsg").textContent = "";
                document.getElementById("emailerror").textContent = "";
                document.getElementById("input").style.border = "1px solid #43AFFF";
                document.getElementById("inputbox").style.border = "1px solid #43AFFF";
                document.getElementById("errormsg").textContent = resp.errors[0].password;
              document.getElementById("emailerror").textContent = resp.errors[1].email;
              document.getElementById("input").style.border = "1px solid #FF333380";
              document.getElementById("inputbox").style.border = "1px solid #FF333380";
              document.getElementById("container").style.height = "450px";
              }
              }
            }
          }
        )
      }

      const passwordchange = () =>{
        history.push('/ForgotPassword');
    }

    const signup = () =>{
        history.push('/register');
    }

    return (
        <div>
        <Header/>
        <div className="container" id="container">
        <h3>Login</h3>
        <form>
        <div className="form-control">
           <label>Email address</label>
           <input type="text" placeholder="Enter your email" id="input" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        </div>
        <p className="errormsgemail" id="emailerror"></p>
        <div className="form-control">
        <a style={{cursor:"pointer"}}><div className="passwordchange" onClick={passwordchange}>
          Forgot your password?
        </div></a>
           <label>Password</label>
           <input type="password" placeholder="Enter your password" id="inputbox" value={password} onChange={(e)=>setpassword(e.target.value)}></input>
           <p className="errormsg" id="errormsg"></p>
        </div>
        <br></br>
        <button className="btn" onClick={signin}>Login</button>
         <div className="new">
           <p>New to MyJobs?</p>
           <a style={{cursor:"pointer"}}><div onClick={signup}>Create an account</div></a>
         </div>
      </form>
    </div>
        </div>
    )
}

export default Content
