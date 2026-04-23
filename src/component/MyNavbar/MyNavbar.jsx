import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import UserAvatar from '../../utils/useAvatar';
import './MyNavbar.css';
const MyNavbar = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const handleLogout = () => {
    try {
      localStorage.clear();
      navigate('/login', { replace: true });
    } catch (error) {
      error.response;
    }
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <input
          type="text"
          className="nav-search"
          placeholder="Say I can law and"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="nav-right">
        <UserAvatar name={decoded.username} role={decoded.role} />
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyNavbar;
