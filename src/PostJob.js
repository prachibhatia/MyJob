import React from 'react'
import './App.css';
import { useState } from 'react';
import { useHistory } from 'react-router';

const PostJob = () => {

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [location,setLocation]= useState("");
    const history = useHistory();

    const logout = ()=>{
          localStorage.clear();
          localStorage.setItem("isloggedin","false");
          history.push('./');
    }
    const post =(e)=>{
        e.preventDefault();
        const res = fetch(" https://jobs-api.squareboat.info/api/v1/jobs/",{
            method:"POST",
            headers:{
                 "Content-Type" : "application/json",
                 "Authorization" :localStorage.getItem("token"),
            },
            body:JSON.stringify({
                    "title": title,
                    "description": description,
                    "location": location
            })
        }).then(res => res.json())
        .then(resp=>{
            console.log(resp);
            if(resp.success==true){
                history.push('./myjobs')
            }
            else if(resp.code=="401"){
                document.getElementById("titleerr").textContent = "You are not authorized to post! Please Login first";
            }
            else{
                resp.errors.map((i)=>{
                    if(i.title){
                        document.getElementById("title").style.border = "1px solid #FF333380";
                        document.getElementById("titleerr").textContent = i.title;
                    }
                    if(i.description){
                        document.getElementById("description").style.border = "1px solid #FF333380";
                        document.getElementById("descriptionerr").textContent = i.description;
                    }
                    if(i.location){
                        document.getElementById("location").style.border = "1px solid #FF333380";
                        document.getElementById("locationerr").textContent = i.location;
                    }
                })
            }
        }
    )
    }
    return (
        <div>
        <div className="header">
        <div className="headerbox"><h1>My</h1>
        <h2>Jobs</h2>
        <hr></hr>
        </div>
        <div className="dot">
            <div className="dropdown">
                <a onClick={logout}>Logout</a>
                 </div>
        </div>
        <i class="arrow down"></i>
        <div className="jobpost">Post a job</div>
        </div>
        <div className="container-postjob">
        <h3>Post a Job</h3>
        <form>
        <div className="form-control">
           <label>Job Title*</label>
           <input type="text" placeholder="Enter job detail" id="title" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
        </div>
        <div className="titleerr" id="titleerr"></div>
        <div className="form-control">
           <label>Description*</label>
           <textarea type="text" placeholder="Enter job description" id="description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
        </div>
        <div className="descriptionerr" id="descriptionerr"></div>
        <div className="form-control">
           <label>Location*</label>
           <input type="text" placeholder="Enter location" id="location" value={location} onChange={(e)=>setLocation(e.target.value)}></input>
        </div>
        <div className="locationerr" id="locationerr"></div>
        <button className="btn" onClick={post}>Post</button>
        </form>
        </div>
        </div>
    )
}

export default PostJob
