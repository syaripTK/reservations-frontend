import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../../utils/axiosInstance';
import UserDashboard from '../../component/DashboardUser/UserDashboard';
import AdminDashboard from '../../component/AdminDashboard/AdminDashboard';

const Dashboard = () => {
  const [statsData, setStatsData] = useState({
    stats: { pending: 0, approved: 0, rejected: 0, returned: 0 },
    recentReservations: [],
  });
  const [summaryData, setSummaryData] = useState({
    totalReservations: 0,
    pendingReservations: 0,
    approvedReservations: 0,
    rejectedReservations: 0,
    activeReservations: [],
  });
  const [adminStats, setAdminStats] = useState({
    stats: {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      returned: 0,
      totalUsers: 0,
    },
    recentReservations: [],
  });
  const [adminSummary, setAdminSummary] = useState({
    activeReservations: [],
    overdueReservations: [],
    pendingReservations: [],
    summary: {
      activeCount: 0,
      approvalRate: '',
      approvedCount: 0,
      overdueCount: 0,
      pendingCount: 0,
      rejectedCount: 0,
      totalReservations: 0,
    },
    userActivity: [],
  });
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  const getMyProfile = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/auth/me`,
      );
      setProfile(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const getUserStatistic = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/reservations/dashboard/user-stats`,
      );
      console.info(response);
      setStatsData(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const getUserSummary = async () => {
    try {
      const result = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/reservations/dashboard/user-summary`,
      );
      console.info('Summaryyyyyy', result);
      setSummaryData(result.data.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const getAdminStatistic = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/reservations/dashboard/admin-stats`,
      );
      console.info(response.data);
      setAdminStats(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const getAdminSummary = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/reservations/dashboard/admin-summary`,
      );
      console.info('Admin Summmary', response.data);
      setAdminSummary(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  useEffect(() => {
    if (decodedToken.role === 'user') {
      const initData = async () => {
        return await Promise.all([getUserStatistic(), getUserSummary()]);
      };
      initData();
    } else {
      const dataInit = async () => {
        return await Promise.all([getAdminSummary(), getAdminStatistic()]);
      };
      dataInit();
    }
  }, [decodedToken.role]);

  return (
    <div>
      {decodedToken.role === 'user' ? (
        <UserDashboard statsData={statsData} summaryData={summaryData} />
      ) : (
        <AdminDashboard statsData={adminStats} summaryData={adminSummary} />
      )}
    </div>
  );
};

export default Dashboard;
