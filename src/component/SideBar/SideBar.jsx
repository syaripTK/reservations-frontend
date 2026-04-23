import { jwtDecode } from 'jwt-decode';
import { NavLink } from 'react-router-dom';
import './SideBar.css';
import UserAvatar from '../../utils/useAvatar';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
const Sidebar = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const role = decoded.role;

  const menuAdmin = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/dashboard/reservations', label: 'Reservations' },
    { to: '/dashboard/assets', label: 'Assets' },
    { to: '/dashboard/category', label: 'Category' },
    { to: '/dashboard/users', label: 'Users' },
    { to: '/dashboard/profile', label: 'Profile' },
  ];

  const menuUser = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/dashboard/new_reservation', label: 'New Reservation' },
    { to: '/dashboard/history', label: 'My History' },
    { to: '/dashboard/profile', label: 'Profile' },
  ];

  const menuList = role === 'user' ? menuUser : menuAdmin;

  useEffect(() => {
    getMyProfile();
  }, []);

  const getMyProfile = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/auth/me`,
      );
      setProfile(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <div className="Sidebar">
      <div className="sidebar-scan" />

      <div className="nav-logo">
        <span className="nav-logo-bracket">
          [<span className="nav-logo">ASSETFLOW</span>]
        </span>
      </div>

      <ul>
        {menuList.map((menu) => (
          <li key={menu.to}>
            <NavLink
              to={menu.to}
              className={({ isActive }) => (isActive ? 'menu active' : 'menu')}
              end={menu.to === '/dashboard'}
            >
              {menu.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            <UserAvatar name={decoded.usename} role={decoded.role} />
          </div>
          <div>
            <div className="sidebar-username">{profile?.full_name}</div>
            <div className="sidebar-role">
              ● {decoded.role == 'admin' ? 'Admin' : 'User'}
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar-version">v2.4.1 — AssetFlow</div>
    </div>
  );
};

export default Sidebar;
