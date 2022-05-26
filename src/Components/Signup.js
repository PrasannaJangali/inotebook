import React from 'react'
import {useNavigate} from 'react-router-dom';
function Signup(props) {
    const a1="http://localhost:5000/api"
    const Navigate=useNavigate();
    const createuser=async(e)=>{
        e.preventDefault();
        const a=document.getElementById('Name');
        const b=document.getElementById('Email');
        const c=document.getElementById('Password');
        const response = await fetch(`${a1}/auth/createnewuser`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({Name:a.value,Email:b.value,Password:c.value})
          });
            const json=await response.json();
            console.log(json.authtoken);
            if(json.success){
                localStorage.setItem('token',json.authtoken);
                Navigate('/');
                props.showalert('Accout Created Successfully','success');
            }
            a.value=b.value=c.value="";
    }
    return (
        <div>
            <h3>Create an account to use iNotebook</h3>
            <form className='container my-3' onSubmit={createuser}>
                <div className="form-group my-2">
                    <label htmlFor="Name">Username</label>
                    <input type="text" className="form-control" id="Name" required  aria-describedby="emailHelp" placeholder="Enter Username" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="Email">Email address</label>
                    <input type="email" className="form-control" id="Email"  required aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="Password">Password</label>
                    <input type="password" className="form-control" id="Password" required minLength={5} placeholder="Password" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" required  placeholder="Confirm Password" />
                </div>
                <button type="submit"  className="btn btn-primary">Create Account</button>
            </form>
        </div>
    )
}

export default Signup