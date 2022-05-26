import React,{useContext} from 'react'
import {useNavigate}from 'react-router-dom';
import notecontex from '../Context/Notes/notescontext';

function Login(props) {
    const navigate=useNavigate();
    const context = useContext(notecontex);
    const {fetchnotes}=context;
    const a1='http://localhost:5000/api';
    const loginuser=async(e)=>{
        e.preventDefault();
        const a=document.getElementById('Email');
        const b=document.getElementById('Password');
        const response = await fetch(`${a1}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
           body: JSON.stringify({Email:a.value,Password:b.value})
          });
          const json=await response.json();
          if(json.success)
          {
              localStorage.setItem('token',json.authtoken);
              console.log(json.authtoken);
              props.showalert('Loggedin Successfully Successfully','success');
              navigate('/');
          }
          else{
              props.showalert("Error : Invalid Details","danger");
          }
          a.value="";
          b.value='';
    }
    return (
        <div>
            <h3>Please Login to use iNotebook</h3>
            <form className='container' onSubmit={loginuser}>
                <div className="form-group my-3">
                    <label className='my-1' htmlFor="Email">Email address</label>
                    <input type="email" className="form-control" required  id="Email" aria-describedby="emailHelp" placeholder="Enter Email"/>
                </div>
                <div className="form-group my-3">
                    <label className='my-1' htmlFor="Password">Password</label>
                    <input type="password" className="form-control" required  id="Password" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login