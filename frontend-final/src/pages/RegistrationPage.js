import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'; // Import modal
import './RegistrationPage.css'; // Ensure path is correct

Modal.setAppElement('#root');

const RegistrationPage = () => {
  const [registrationData, setRegistrationData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isTermsAccepted, setIsTermsAccepted] = useState(false); // State for checkbox
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate(); // Navigation hook

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    if (registrationData.password !== registrationData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/register', registrationData);
      setSuccessMessage(response.data.message || 'Registration successful!');
      setErrorMessage('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'An error occurred.');
    }
  };
  

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setIsTermsAccepted(!isTermsAccepted);
    setErrorMessage(''); // Clear error message when checkbox is clicked
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="registration-container">
      <div className="form-container">
        <h1>Create Your Account</h1>
        <p>Welcome back! Please enter your details</p>
        <form onSubmit={handleRegistrationSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={registrationData.username}
            onChange={handleRegistrationChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={registrationData.name}
            onChange={handleRegistrationChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={registrationData.email}
            onChange={handleRegistrationChange}
            required
          />
          <input
            type="text"
            name="university"
            placeholder="Enter your university name"
            value={registrationData.university}
            onChange={handleRegistrationChange}
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={registrationData.password}
              onChange={handleRegistrationChange}
              required
            />
            <span
              onClick={togglePasswordVisibility}
              style={{ marginLeft: '10px', cursor: 'pointer', color: 'blue' }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Retype Password"
              value={registrationData.confirmPassword}
              onChange={handleRegistrationChange}
              required
            />
            <span
              onClick={togglePasswordVisibility}
              style={{ marginLeft: '10px', cursor: 'pointer', color: 'blue' }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <div className="terms">
            <input
              type="checkbox"
              id="termsCheckbox"
              checked={isTermsAccepted}
              onChange={handleCheckboxChange}
              required
            />
            <label htmlFor="termsCheckbox">
              I accept all{' '}
              <span onClick={openModal} style={{ color: 'blue', cursor: 'pointer' }}>
                terms & conditions
              </span>
            </label>
          </div>
          <button type="submit" className="submit-btn" disabled={!isTermsAccepted}>
            Register
          </button>
        </form>

        {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p className="success-message" style={{ color: 'green' }}>{successMessage}</p>}

        <p className="login-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Terms and Conditions">
        <h2>Terms and Conditions</h2>
        <p>By registering, you agree to our terms and conditions...</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default RegistrationPage;
