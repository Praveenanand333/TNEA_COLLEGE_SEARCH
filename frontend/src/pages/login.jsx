import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const toggleRole = () => {
    setIsAdmin(prev => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (isAdmin) {
      navigate('/admin');
    } else {
      alert('Logged in as user (no user dashboard yet)');
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{isAdmin ? "Admin Login" : "User Login"}</h2>
      <form onSubmit={handleLogin}>
        <label>
        Username:
        <input type="email" 
        placeholder="Example@gmail.com"
         required /><br /> <br />
        </label>
        <label>
        Password:
        <input type="password" placeholder="Password" required /><br /><br />
        </label>
        <button type="submit">Login</button>
      </form>
      <br />
      <p>Don't have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate('/Register')}>Register</span></p>
      <div style={{textAlign:'center'}}>
       <button onClick={toggleRole} className='switch-role-btn'>
        Switch to {isAdmin ? "User" : "Admin"}
       </button>
      </div>
     
    </div>
  );
};

export default Login;
