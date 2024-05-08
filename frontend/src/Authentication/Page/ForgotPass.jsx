  // ForgotPass.js
  import React, { useState } from 'react';
  import './ForgotPass.css'
  import { useNavigate } from 'react-router-dom';

  const ForgotPass = () => {
    const navigate = useNavigate();
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [message, setMessage] = useState('');

      const handleChange = (e) => {
        
          if (e.target.name === 'email') setEmail(e.target.value);
          if (e.target.name === 'password') setPassword(e.target.value);
          if (e.target.name === 'confirmPassword') setConfirmPassword(e.target.value);
      };

      const handleSubmit = async (e) => {
          e.preventDefault();
          if (password !== confirmPassword) {
              setMessage("Passwords don't match");
              return;
          }
          try {
              const response = await fetch('http://localhost:4000/resetpassword', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ email, password })
              });
              const data = await response.json();
              setMessage(data.message);
              // Redirect to login page after 2 seconds
              setTimeout(() => {
                navigate('/login');
            }, 2000);
          } catch (error) {
              console.error('Error:', error);
          }
      };

      return (
          <div className='forgot-pass-container'>
              <h1 className='forgot-pass-title'>Forgot Password</h1>
              <form onSubmit={handleSubmit} className='forgot-pass-form'>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" value={email} onChange={handleChange} required />
                  <label htmlFor="password">New Password:</label>
                  <input type="password" id="password"className='passent' name="password" value={password} onChange={handleChange} required />
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input type="password" id="confirmPassword" className='passent' name="confirmPassword" value={confirmPassword} onChange={handleChange} required />
                  <button type="submit">Reset Password</button>
              </form>
              <p>{message}</p>
          </div>
      );
  }

  export default ForgotPass;
