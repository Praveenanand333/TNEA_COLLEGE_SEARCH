import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    Cutoff:'',
    Rank:'',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword){
        alert("Password did not match")
    }
    alert("Registration successful!");
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="email"
            name="email"
            placeholder="Example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          /><br /><br />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          /><br /><br />
        </label>
        <label>
        Confirm Password:
        <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
        /><br /><br />
        </label>
        <label>
            Cutoff:
            <input
                type="number"
                step="0.01"
                name="Cutoff"
                value={formData.Cutoff}
                onChange={handleChange}
            /><br /><br />
        </label>
         <label>
            Rank:
            <input
                type="number"
                name='Rank'
                value={formData.Rank}
                onChange={handleChange}
            /><br /><br />
        </label>

        <button type="submit">Register</button>
      </form>
      <br />
      <p>Already have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate('/')}>Login</span></p>
    </div>
  );
};

export default Register;

