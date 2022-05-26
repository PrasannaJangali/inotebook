import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import About from './Components/About';
import Notestate from './Context/Notes/notesstates';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Signup from './Components/Signup';
import Alert from './Components/Alert';
import Welcome from './Components/Welcome';
function App() {
  const [alert, setalert] = useState(null);
  const showalert=(msg,type)=>{
    setalert({
      message:msg,
      type:type
    })
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }
 
  return (
    <>
      <Notestate>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
          <Routes >
            <Route exact path="/" element={<Welcome />}></Route>
            <Route exact path="/home" element={<Home showalert={showalert} />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/login" element={<Login showalert={showalert}/>}></Route>
            <Route exact path="/signup" element={<Signup showalert={showalert} />}></Route>
          </Routes>
          </div>
        </Router>
      </Notestate>
    </>
  );
}

export default App;
