import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const validatePassword = (password) => {  
  const minLength = /.{8,}/;  
  const uppercase = /[A-Z]/;  
  const lowercase = /[a-z]/;  
  const number = /[0-9]/;  
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;  
  
  return (  
    minLength.test(password) &&  
    uppercase.test(password) &&  
    lowercase.test(password) &&  
    number.test(password) &&  
    specialChar.test(password)  
  );  
};


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const handleLogin = (e) => {
  e.preventDefault();
  
  if (!validatePassword(formData.password)) {
    alert("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
    return;
  }
};



    
    if (isAdmin) {
      if (
        formData.email === 'admin@example.com' &&
        formData.password === 'admin123'
      ) {
        alert('Admin login successful');
        navigate('/admin');
      } else {
        alert('Invalid admin credentials');
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
