import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegistrationPage.css';
import BackgroundImage from '../assests/pexels-pixabay-207691.jpg';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook to navigate after login
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', loginData);
      const { success, message } = response.data;
      if (success) {
        setIsLoggedIn(true); // Mark the user as logged in
        setErrorMessage('');
        navigate('/admin-dashboard'); // Redirect to Admin Dashboard
      } else {
        setErrorMessage(message); // Display error message
      }
    } catch (error) {
      console.error('Login error', error);
      setErrorMessage('An error occurred during login.');
    }
    setLoginData({
      username: '',
      password: '',
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div
      className="registration-container"
      style={{
        backgroundImage: `url(${BackgroundImage})`, // Use imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div
        className="form-container"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '8px' }}
      >
        <h1>Login Page</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Show error message */}
        <form onSubmit={handleLoginSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          <button type="submit" className="submit-btn">Login</button>
        </form>
        <p className="login-link">
          Not Registered yet? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
