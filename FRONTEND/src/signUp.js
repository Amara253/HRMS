import React, { useState } from 'react';
import './signUp.css'; // Import SignUp.css for styling
import SignUpPic from './src assets/pic2.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
 
const SignUp = ({handleAlreadyLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
 
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError('');
  };
 
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };
 
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };
 
//   const handlesignin = () => {
//     useNavigate("/")
//   }
 
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission
    if (username.trim() === '') {
      setUsernameError('Username is required');
    }
    if (password.trim() === '') {
      setPasswordError('Password is required');
    }
    if (email.trim() === '') {
      setEmailError('Email is required');
    }
 
    if (username.trim() !== '' && password.trim() !== '' && email.trim() !== '') {
      // Handle form submission
      // For example, you can make an API call to register the user
 
      // Show the popup message
      const response = await axios.post('http://localhost:5000/api/register', {
        name: username,
        email: email,
        password: password
      })
      if(response){
        setUsername('');
        setPassword('');
        setEmail('');
        alert("you have succesfullt register now login!")
      }
      setShowPopup(true);
 
      // Reset form fields
      
    }
  };
 
  return (
    <div className="sign-up-container">
      <div className="left-side-sign-up">
        <img src={SignUpPic} alt="Sign Up Pic" className="sign-up-pic" />
      </div>
      <div className="right-side-sign-up">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container-sign-up">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              className={`input-sign-up ${usernameError && 'input-error'}`}
            />
            {usernameError && <p className="error-message">{usernameError}</p>}
          </div>
          <div className="input-container-sign-up">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className={`input-sign-up ${passwordError && 'input-error'}`}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div className="input-container-sign-up">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className={`input-sign-up ${emailError && 'input-error'}`}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <p>
          Already registered?  <a href="/" >Login</a>
         
        </p>
          <button type="submit" className="sign-up-button">Sign Up</button>
        </form>
        {/* Popup message */}
        {showPopup && (
          <div className="popup">
            <p>You have successfully registered!</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        )}
 
      </div>
    </div>
  );
};
 
export default SignUp;