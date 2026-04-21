import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../../utils/axiosInstance';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    getMyProfile();
  }, []);

  const getMyProfile = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/auth/me`,
      );
      console.log(response);
      setProfile(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <div>
      <h1>Hi {profile?.full_name}</h1>
    </div>
  );
};

export default Dashboard;
