import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import '../RegistrationPage.css';
import BackgroundImage from '../../assests/pexels-pixabay-207691.jpg';

const StudentLogin = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the login request to the server
      const response = await axios.post('http://localhost:8000/student-login', loginData);
      const { success, message } = response.data;

      if (success) {
        console.log('Login Successful');
        // Redirect to the student dashboard if login is successful
        navigate('/student-dashboard');
      } else {
        console.log(message);
        // Optionally, show some error message to the user here
      }
    } catch (error) {
      console.error('Login error', error);
      // Optionally, show some error message if the login request fails
    }

    // Reset the login form
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
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div
        className="form-container"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '8px' }}
      >
        <h1>Student Login</h1>
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
      </div>
    </div>
  );
};

export default StudentLogin;
