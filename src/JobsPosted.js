import React from 'react'
import { useHistory } from 'react-router'
import { useEffect } from 'react';

const JobsPosted = () => {

    useEffect(()=>{

        document.getElementById("jobpace").innerHTML="";
        const res = fetch(" https://jobs-api.squareboat.info/api/v1/recruiters/jobs",{
            method:"GET",
            headers:{
                 "Content-Type": "application/json",
                 "Authorization":localStorage.getItem("token"),
            }
        }).then(res => res.json())
        .then(resp=>{
            if(resp.message=="No jobs posted"){
                document.getElementById("space").style.display="block";
            }
            else if(resp.code=="401"){
               alert("You are not logged in");
               history.push('./login');
            }
            else{
                resp.data.data.map((i)=>{
                    console.log(i);
                    document.getElementById("jobpace").innerHTML += "<div>"+"<h2>"+i.title+"</h2>"+"<p>"+i.description+"</p>"+'<h1><i class="fa fa-map-marker" aria-hidden="true">'+"    "+i.location+"</i></h1>"+`<a><button class="view" id='${i.id}'>View Applications`+"</button></a></div>";
                    document.querySelectorAll('.view').forEach(item => {
                        item.addEventListener('click', event => {
                            //console.log(event.target.id);
                            document.getElementById("myModal").style.display = "block";

                        })
                      })
                })
            }
        })



    })
     

    const history = useHistory();
    const post = ()=>{
         history.push("./postjob");
    }

    const home =()=>{
        history.push('./');
    }

    const logout = ()=>{
        localStorage.clear();
          localStorage.setItem("isloggedin","false");
          history.push('./');
    }

      const close = ()=>{
        document.getElementById("myModal").style.display = "none";
      }

    return (
        <div>
            <div>
        <div className="header" style={{height:"200px"}}>
        <div className="headerbox"><h1>My</h1>
        <h2>Jobs</h2>
        <hr></hr>
        </div>
        <div className="dot">
            <div className="dropdown">
                <a onClick={logout}>Logout</a>
                 </div>
        </div>
        <i className="arrow down"></i>
        <a style={{cursor:"pointer"}}><div className="jobpost" onClick={post}>Post a Job</div></a>
        <a style={{cursor:"pointer"}}><p className="jobheader" onClick={home} style={{fontSize:"12px"}}><i class="fa fa-home"> Home</i></p></a>
        <p className="jobheader" style={{marginTop:"-15px"}}>Jobs posted by you</p>
        </div>
        </div>
        <div className="myjobspace" id="jobpace">
        </div>
        <div className="writingSpace" id="space" >
        <img src={"./writing.png"} alt="writing" className="writing"></img>
        <p>Your posted jobs will show here!</p>
        <button className="btn" onClick={post}>Post a job</button>
        </div>
        <div id="myModal" className="modal">
        <div className="modal-content"> 
        <div class="modal-header">
        <span className="close" onClick={close} id="closemodal">&times;</span>
         <p>Applicants for this job</p>
         <span>0 applications</span>
        </div>
        <div className="appdata">
            <img src="./curri.jpg"></img>
            <p>No applications available!</p>
        </div>
        </div>

        </div>
        </div>
    )
}

export default JobsPosted
