import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  ArrowLeftRight,
} from 'lucide-react';
import './Reservations.css';
import {
  notyfSuccess,
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notyf';
import Swal from 'sweetalert2';

const Reservations = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reservations, setReservations] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    getReservations();
  }, []);
  const getReservations = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/reservations`,
      );
      const reservations = response.data.data;
      console.info(reservations);
      setReservations(reservations.data);
      setPagination(reservations.pagination);
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  const itemsPerPage = 10;

  const totalPages = Math.ceil(reservations.length / itemsPerPage);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const paginatedData = reservations.slice(firstIndex, lastIndex);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="edit-assets-container">
        <div className="loading-wrapper">
          <div className="loading-spinner">Memuat Data...</div>
          <img src="/owi.jpeg" alt="owi" className="loading-image" />
          <div className="loading-bar-container">
            <div className="loading-bar-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleApprove = async (id) => {
    try {
      const approve = await axiosInstance.put(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/reservations/${id}/approve`,
      );
      showSuccessNotification(approve.data.message);
      getReservations();
    } catch (error) {
      console.error(error.response);
      showErrorNotification(
        error.response.data.message || 'Ooops, terjadi kesalahan',
      );
    }
  };

  const handleReject = async (id) => {
    const { value: rejectionReason } = await Swal.fire({
      title: '<div class="swal-brutalist-title">REJECT // RESERVATION</div>',
      html: `
      <div class="swal-brutalist-body">
        <div class="input-group">
          <label>REJECTION REASON</label>
          <textarea 
            id="swal-rejection-note" 
            class="custom-swal-textarea" 
            placeholder="Explain why this request is being denied..."></textarea>
        </div>
      </div>
    `,
      background: '#010101',
      showCancelButton: true,
      confirmButtonText: 'CONFIRM_REJECTION',
      cancelButtonText: 'ABORT',
      buttonsStyling: false,
      customClass: {
        popup: 'swal-brutalist-popup',
        confirmButton: 'swal-btn-reject-confirm',
        cancelButton: 'swal-btn-cancel',
      },
      preConfirm: () => {
        const reason = document.getElementById('swal-rejection-note').value;
        if (!reason) {
          return Swal.showValidationMessage('YOU MUST PROVIDE A REASON');
        }
        return reason;
      },
    });

    if (rejectionReason) {
      try {
        const response = await axiosInstance.put(
          `${import.meta.env.PUBLIC_API_URL}/api/v1/reservations/${id}/reject`,
          { reject_reason: rejectionReason },
        );

        notyfSuccess(response.data.message || 'RESERVATION REJECTED');
        getReservations();
      } catch (error) {
        console.error(error.response);
        showErrorNotification(
          error.response?.data?.message || 'FAILED TO REJECT RESERVATION',
        );
      }
    }
  };

  return (
    <div className="assets-wrapper">
      {/* HEADER */}
      <div className="assets-header">
        <div className="assets-header-left">
          <div className="assets-label"># Reservasi</div>
          <h1 className="assets-title">
            DATA <em>RESERVASI</em>
          </h1>
        </div>
      </div>

      {/* TABLE */}
      <div className="assets-content">
        <div className="table-toolbar">
          <div className="table-toolbar-left">
            Total <span>{pagination.totalItems || 0}</span> reservasi ditemukan
          </div>
        </div>
        <div className="table-scroll">
          <table className="table-assets">
            <thead>
              <tr>
                <th>#</th>
                <th>Peminjam</th>
                <th>Aset</th>
                <th>Tanggal Sewa</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData &&
                paginatedData.map((res, idx) => (
                  <tr key={res.id} className="table-row">
                    <td className="col-index">
                      {(currentPage - 1) * (pagination.itemsPerPage || 10) +
                        idx +
                        1}
                    </td>
                    <td className="col-user">
                      <div className="user-aran">{res.user.full_name}</div>
                      <div className="user-handle">@{res.user.username}</div>
                    </td>
                    <td className="col-asset">
                      <div className="asset-name">{res.asset.name}</div>
                      <div className="asset-sku">{res.asset.sku}</div>
                    </td>
                    <td className="col-date">
                      <span className="date-text">
                        {formatDate(res.start_date)}{' '}
                        <span className="hatta">-</span>{' '}
                        {formatDate(res.end_date)}
                      </span>
                    </td>
                    <td className="col-status">
                      <span
                        className={`status-badge status-${res.status.toLowerCase()}`}
                      >
                        {res.status}
                      </span>
                    </td>
                    <td className="col-actions">
                      <div className="action-wrapper">
                        <button
                          onClick={() => handleApprove(res.id)}
                          className="btn-approve"
                          disabled={res.status !== 'pending'}
                        >
                          APPROVE
                        </button>
                        <button
                          onClick={() => handleReject(res.id)}
                          className="btn-reject"
                          disabled={res.status !== 'pending'}
                        >
                          REJECT
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <div className="pagination-info">
            Halaman <span>{currentPage}</span> dari <span>{totalPages}</span>
          </div>
          <div className="pagination-controls">
            <button
              className="page-btn"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              <ArrowBigLeftDash size={16} />
            </button>
            <button className="page-btn active">{currentPage}</button>
            <button
              className="page-btn"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ArrowBigRightDash size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
