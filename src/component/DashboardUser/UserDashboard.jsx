import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import './UserDashboard.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

const UserDashboard = ({ statsData, summaryData }) => {
  const doughnutData = {
    labels: ['PENDING', 'APPROVED', 'REJECTED', 'RETURNED'],
    datasets: [
      {
        data: [
          statsData.stats.pending,
          statsData.stats.approved,
          statsData.stats.rejected,
          statsData.stats.returned,
        ],
        backgroundColor: ['#f0e040', '#4ade80', '#e63030', '#60a5fa'],
        borderColor: '#0a0a0a',
        borderWidth: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#888888',
          font: { family: 'DM Mono, monospace', size: 10 },
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#f5f2eb',
        bodyColor: '#888888',
        borderColor: 'rgba(245,242,235,0.1)',
        borderWidth: 1,
        titleFont: { family: 'DM Mono, monospace', size: 11 },
        bodyFont: { family: 'DM Mono, monospace', size: 11 },
      },
    },
  };

  return (
    <div className="ud-wrapper">

      <div className="ud-stats-grid">
        <StatCard label="TOTAL_RESERVATIONS"  value={summaryData.totalReservations}    color="white" />
        <StatCard label="PENDING"    value={summaryData.pendingReservations}   color="yellow" />
        <StatCard label="APPROVED"   value={summaryData.approvedReservations}  color="green" />
        <StatCard label="REJECTED"   value={summaryData.rejectedReservations}  color="red" />
      </div>

      {/* ── MAIN GRID ── */}
      <div className="ud-main-grid">

        {/* Doughnut Chart */}
        <div className="ud-card">
          <h3 className="ud-card-title">STATUS_DISTRIBUTION</h3>
          <div className="ud-chart-wrap">
            <Doughnut data={doughnutData} options={chartOptions} />
          </div>
        </div>

        {/* Active Reservations */}
        <div className="ud-card">
          <h3 className="ud-card-title ud-card-title--green">ACTIVE_RESERVATIONS</h3>
          <div className="ud-list">
            {summaryData.activeReservations.length > 0 ? (
              summaryData.activeReservations.map((item) => (
                <div key={item.id} className="ud-list-item">
                  <div className="ud-item-info">
                    <span className="ud-item-sku">{item.asset.sku}</span>
                    <span className="ud-item-name">{item.asset.name}</span>
                  </div>
                  <span className="ud-item-status">IN_USE</span>
                </div>
              ))
            ) : (
              <p className="ud-empty">NO_ACTIVE_ASSETS_FOUND</p>
            )}
          </div>
        </div>

      </div>

      {/* ── ACTIVITY LOG TABLE ── */}
      <div className="ud-card ud-card--full">
        <h3 className="ud-card-title">RECENT_ACTIVITY_LOG</h3>
        <div className="ud-table-wrap">
          <table className="ud-table">
            <thead>
              <tr className="ud-thead-row">
                <th className="ud-th">ASSET_NAME</th>
                <th className="ud-th">START_DATE</th>
                <th className="ud-th">END_DATE</th>
                <th className="ud-th">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {statsData.recentReservations.map((res) => (
                <tr key={res.id} className="ud-tr" data-status={res.status}>
                  <td className="ud-td ud-td--name">{res.asset.name}</td>
                  <td className="ud-td ud-td--date">
                    {new Date(res.start_date).toLocaleDateString()}
                  </td>
                  <td className="ud-td ud-td--date">
                    {new Date(res.end_date).toLocaleDateString()}
                  </td>
                  <td className="ud-td">
                    <span className={`ud-status-badge ud-status-badge--${res.status}`}>
                      {res.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

/* ── STAT CARD ── */
const StatCard = ({ label, value, color }) => (
  <div className={`ud-stat-card ud-stat-card--${color}`}>
    <span className="ud-stat-label">{label}</span>
    <span className="ud-stat-value">{value}</span>
  </div>
);

/* ── STATUS COLOR (logic tetap) ── */
const getStatusColor = (status) => {
  switch (status) {
    case 'approved': return '#4ade80';
    case 'rejected': return '#e63030';
    case 'pending':  return '#f0e040';
    default:         return '#f5f2eb';
  }
};

export default UserDashboard;
