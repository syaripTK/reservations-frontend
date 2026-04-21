import React, { useState } from 'react';
import './DashboardLayout.css';
import { Outlet } from 'react-router-dom';
import MyNavbar from '../../component/MyNavbar/MyNavbar';
import Sidebar from '../../component/SideBar/SideBar';

const DashboardLayout = () => {
  const [search, setSearch] = useState('');

  return (
    <div>
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-main">
          <MyNavbar search={search} setSearch={setSearch} />
          <main className="dashboard-content">
            <Outlet context={{ search }} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
