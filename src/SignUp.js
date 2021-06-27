import React from 'react'
import Header from './Header'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [name, setName] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [skills, setSkill] = useState('');

    const history = useHistory();

    const signup = (e)=>{
        e.preventDefault();
        document.getElementById("password").style.border = "1px solid #43AFFF";
        document.getElementById("email").style.border = "1px solid #43AFFF";
        document.getElementById("name").style.border = "1px solid #43AFFF";
        document.getElementById("confirmpassword").style.border = "1px solid #43AFFF";
        document.getElementById("skills").style.border = "1px solid #43AFFF";
        document.getElementById("cpwderr").textContent="";
        document.getElementById("pwderr").textContent="";
        document.getElementById("emailerr").textContent="";
        document.getElementById("nameerr").textContent="";

        const res = fetch("https://jobs-api.squareboat.info/api/v1/auth/register",{
            method:"POST",
            headers:{
                 "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                "email":email,
                "userRole":0,
                "password": password,
	            "confirmPassword": confirmpassword,
	            "name": name,
	            "skills": skills
            })
        }).then(res => res.json())
        .then(resp=>{
           if(resp.success==true){
               history.push('./myjobs');
           }
           else if(!resp.errors){
            document.getElementById("nameerr").textContent = "This email id has been already registered";
            document.getElementById("password").style.border = "1px solid #FF333380";
            document.getElementById("confirmpassword").style.border = "1px solid #FF333380";
            document.getElementById("name").style.border = "1px solid #FF333380";
            document.getElementById("email").style.border = "1px solid #FF333380";
            document.getElementById("skills").style.border = "1px solid #FF333380";
           }
           else{
               console.log(resp);
               resp.errors.map((i)=>{
                  if(i.password){
                    document.getElementById("password").style.border = "1px solid #FF333380";
                    document.getElementById("pwderr").textContent = i.password;
                  }
                  if(i.email){
                    document.getElementById("email").style.border = "1px solid #FF333380";
                    document.getElementById("emailerr").textContent = i.email;
                  }
                  if(i.name){
                    document.getElementById("name").style.border = "1px solid #FF333380";
                    document.getElementById("nameerr").textContent = i.name;
                  }
                  if(i.confirmPassword){
                    document.getElementById("password").style.border = "1px solid #FF333380";
                    document.getElementById("confirmpassword").style.border = "1px solid #FF333380";
                    document.getElementById("cpwderr").textContent = i.confirmPassword;
                  }
               })
           }
        }
        )
    }

    const login = ()=>{
        history.push('/login');
    }

    return (
        <div>
           <Header/> 
           <div className="container-signin">
           <h3>Signup</h3>
           <p>I’m a*</p>
           <button className="btn-signup-recruiter">Recruiter</button>
           <button className="btn-signup">Candidate</button>
           <div className="form-control">
           <label>Full Name*</label>
           <input type="text" placeholder="Enter your full name" id="name" value={name} onChange={(e)=>setName(e.target.value)}></input>
        </div>
        <div className="nameerr" id="nameerr"></div>
        <div className="form-control">
           <label>Email Address*</label>
           <input type="text" placeholder="Enter your email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        </div>
        <div className="err" id="emailerr"></div>
        <div>
        <div className="form-control">
           <label>Create Password*</label>
           <input type="password" placeholder="Enter your password" id="password" value={password} onChange={(e)=>setpassword(e.target.value)}></input>
        </div>
        <div className="pwderr" id="pwderr"></div>
        <div className="form-control">
           <label>Confirm Password*</label>
           <input type="password" placeholder="Enter your password" id="confirmpassword" value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)}></input>
        </div>
        <div className="cpwderr" id="cpwderr"></div>
        </div>
        <div className="form-control">
           <label>Skills</label>
           <input type="text" placeholder="Enter comma seperated skills" value={skills} id="skills" onChange={(e)=>setSkill(e.target.value)}></input>
        </div>
        <button className="btn" onClick={signup}>Signup</button>
        <div className="check">
            <p>Have an account ?</p>
            <a style={{cursor:"pointer"}} onClick={login}><div>Login</div></a>
        </div>
         </div>
        </div>
    )
}

export default SignUp
