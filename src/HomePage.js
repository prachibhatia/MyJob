import React from 'react'
import Header from './Header'
import {useHistory} from 'react-router-dom';
import { useEffect } from 'react';


const HomePage = () => {

    const history = useHistory();

    const getStarted = ()=>{
        console.log("hi");
        history.push('./register')
    }
      useEffect(()=>{
          if(localStorage.getItem("isloggedin")){
            document.getElementById("space").style.visibility="visible";
            localStorage.clear();
          }
          else{
              console.log("hi");
            document.getElementById("space").style.visibility="hidden"; 
          }
      })

    const login = ()=>{
        history.push('./login');
    }

    const close =()=>{
        document.getElementById("space").style.visibility="hidden";
    }

    return (
        <>
        <div>
        <div className="header">
        <div className="headerbox"><h1>My</h1>
        <h2>Jobs</h2>
        <hr></hr>
        </div>
        <button onClick={login}>Login/Signup</button>
        <div className="writingSpacee" id="space">
        <span onClick={close}>&times;</span>
        <p>Logout</p>
        <h1>You have successfully logged out.</h1>
        </div>
        </div>
        <div className="header2">
        <div>Welcome to</div>
        <h1>My</h1>
        <h2>Jobs</h2>
        </div>
        <button className="btngetstarted" onClick={getStarted}>Get Started</button>
        <img src={"./logo.jpg"} alt="Logo" className="image"></img>
        </div>
         <div className="whyus">Why Us</div>
         <div className="parent">
             <div className="child">
                 <div>Get More Visibility</div>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
             </div>
             <div className="child">
             <div>Organize Your Candidates</div>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
             </div>
             <div className="child">
             <div>Verify Their Abilities</div>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
             </div>
         </div>
         <div className="whyus" >Companies Who Trust Us</div>

         <div className="parent-image">
             <img src={"./7.png"} alt="1" className="childimage"></img>
             <img src={"./8.png"} alt="2" className="childimage"></img>
             <img src={"./3.png"} alt="3" className="childimage"></img>
             <img src={"./4.png"} alt="4" className="childimage"></img>
         </div>
        </>
    )
}

export default HomePage
