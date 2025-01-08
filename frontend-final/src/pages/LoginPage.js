import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegistrationPage.css';
import BackgroundImage from '../assests/pexels-pixabay-207691.jpg';

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', loginData);
            const { success, token, message } = response.data;
    
            if (success) {
                // Save the admin token
                localStorage.setItem('adminAuthToken', token);
    
                // Clear error messages
                setErrorMessage('');
    
                // Redirect to the desired URL
                window.location.href = 'https://resonant-concha-fec0d1.netlify.app/';
            } else {
                setErrorMessage(message);
            }
        } catch (error) {
            console.error('Login error', error);
            setErrorMessage('An error occurred during login.');
        }
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
                <h1>Admin Login</h1>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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

export default LoginPage;
