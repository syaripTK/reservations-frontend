import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';
import Swal from 'sweetalert2';
import { notyfError, notyfSuccess } from '../../utils/notyf';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const response = await axios.post(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/auth/login`,
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response);
      notyfSuccess(response.data.message);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error(error.response);
      notyfError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const backLanding = () => {
    navigate('/');
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="header">
          <div className="scan-line"></div>
          <h1>Login</h1>
          <p className="status-text">System Ready</p>
        </div>

        <form onSubmit={handleSubmit} id="loginForm">
          <div className="form-group">
            <label className="form-label">User Identification</label>
            <div className="input-wrapper">
              <i className="fa-solid fa-user field-icon"></i>
              <input
                type="text"
                className="input-field"
                placeholder="Enter username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Security Code</label>
            <div className="input-wrapper">
              <i className="fa-solid fa-lock field-icon"></i>
              <input
                type="password"
                id="passwordField"
                className="input-field"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className="fa-solid fa-eye toggle-icon"
                id="togglePassword"
              ></i>
            </div>
          </div>

          <div className="checkbox-group">
            <label className="custom-checkbox">
              <input type="checkbox" id="rememberMe" />
              <span>Remember Session</span>
            </label>
            <a href="#" className="recovery-link">
              Recovery Mode?
            </a>
          </div>

          <button type="submit" className="submit-btn">
            <span>Initialize Login</span>
          </button>
        </form>

        <div className="register-link">
          <a href="/" onClick={backLanding}>
            Back to landing page →
          </a>
        </div>

        <div className="footer-credit">
          {new Date().getFullYear()} Ahmad Syangkan Syarip
        </div>
      </div>
    </div>
  );
};

export default Login;
