import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; 
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
  }

  const handleLogin = async (e) => {
    e.preventDefault();

     if (isAdmin) {
    try {
      const res = await axios.post('http://localhost:5000/admin/login', {
        username: formData.email, 
        password: formData.password,
      });

      alert(res.data.message);
      navigate('/admin');
    } catch (error) {
      alert(error.response?.data?.message || 'Admin login failed');
    }
  } else {
    alert('User login successful');
    navigate('/user');
  }
  };

  const toggleRole = () => {
    setIsAdmin((prev) => !prev);
    setFormData({ email: '', password: '' }); 
  };

  return (
    <div className="login-container">
      <h2>{isAdmin ? 'Admin Login' : 'User Login'}</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className='password-label'>
          <div className='password-wrapper'>
          Password:
           <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="......."
            value={formData.password}
            onChange={handleChange}
            required
           />
           <span onClick={togglePasswordVisibility} className="eye-icon">
              👁️
           </span>
          </div>
        </label>

        <button type="submit">Login</button>
      </form>

      <p className="switch-text">
        Don't have an account? <span onClick={() => navigate('/register')}>Register</span>
      </p>

      <button className="switch-btn" onClick={toggleRole}>
        Switch to {isAdmin ? 'User' : 'Admin'}
      </button>
    </div>
  );
};

export default Login;
