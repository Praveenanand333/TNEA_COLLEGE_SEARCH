import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [isLogin,setIsLogin]=useState(false);
  const [isAdmin, setIsAdmin] = useState(true); 
  const navigate = useNavigate();

  const toggleRole = () => {
    setIsAdmin(prev => !prev);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault()
    if (isLogin) {
      navigate('/');
    } else {
        alert('Admin login successful');
        setIsLogin(true)
    }
  };

  return (
    <div  class="box box-border border-4 p-4 bg-blue-200">
      <h2>{isAdmin ? "Admin Login" : "User Login"}</h2>
      <form onSubmit={handleAdminLogin}>
        <label>
        Username:
        <input type="email" placeholder="Example@gmail.com" required /><br /> <br />
        </label>
        <label>
        Password:
        <input type="password" placeholder="Password" required /><br /><br />
        </label>
        <button type="submit">Login</button>
      </form>
      <br />
      <button onClick={toggleRole}>
        Switch to {isAdmin ? "User" : "Admin"}
      </button>
    </div>
  );
};

export default Admin;