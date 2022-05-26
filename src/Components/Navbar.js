import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Link
} from 'react-router-dom';
function Navbar() {
    let location = useLocation();
    const Navigate=useNavigate();
    const logout=()=>{
       localStorage.removeItem('token');
       Navigate('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <h3 className='nav-brand'>iNotebook</h3>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/'?'active':''}`}   aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} to="/about">About</Link>
                        </li>
                    </ul>
                </div>            
                <Link type="button" style={{display:(localStorage.getItem('token')||location.pathname==='/login') ?'none':'block'}} to="/login" className="btn btn-info mx-2">Login</Link>               
                <button type="button" style={{display:localStorage.getItem('token')?'block':'none'}} onClick={logout} to="/" className="btn btn-info mx-2">Log Out</button>               
                <Link type="button" style={{display:(localStorage.getItem('token')||location.pathname==='/signup')?'none':'block'}}to="/signup" className="btn btn-info">Sign-Up</Link>
            </div>
        </nav>
    )
}

export default Navbar