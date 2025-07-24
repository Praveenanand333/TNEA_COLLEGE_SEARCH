import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css'


const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    Cutoff:'',
    Rank:'',
  });
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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword){
        alert("Password did not match")
    }
    alert("Registration successful!");
    navigate('/');
  };

  return (
    <div className='register-container'>
      <h2>User Registration</h2>
      <form className='register-form' onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="email"
            name="email"
            placeholder="Example@gmail.com"
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
              value={formData.password}
              onChange={handleChange}
              required
            />
          
           <span onClick={togglePasswordVisibility} className="eye-icon">
              👁️
           </span>
        </div>
        </label>
        <label className='password-label'>
        <div className='password-wrapper'>
        Confirm Password:
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        
         <span onClick={togglePasswordVisibility} className="eye-icon">
              👁️
           </span>
        </div>
        </label>
        <label>
            Cutoff:
            <input
                type="number"
                step="0.01"
                name="Cutoff"
                value={formData.Cutoff}
                onChange={handleChange}
            />
        </label>
         <label>
            Rank:
            <input
                type="number"
                name='Rank'
                value={formData.Rank}
                onChange={handleChange}
            />
        </label>

        <button type="submit">Register</button>
      </form>
      
      <p className="switch-text">Already have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate('/')}>Login</span></p>
    </div>
  );
};

export default Register;

