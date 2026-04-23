import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import ReactDOMServer from 'react-dom/server';

import './Users.css';
import {
  AlertTriangle,
  ArrowBigLeftDash,
  ArrowBigRightDash,
  SquarePen,
  Trash2,
} from 'lucide-react';
import Swal from 'sweetalert2';
import { notyfSuccess } from '../../utils/notyf';
import axiosInstance from '../../utils/axiosInstance';

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  const getUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/users?page=${page}`,
      );
      setUsers(response.data.data.data);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-assets-container">
        <div className="loading-wrapper">
          <div className="loading-spinner">LOADING_DATA...</div>
          <img src="/owi.jpeg" alt="owi" className="loading-image" />
          <div className="loading-bar-container">
            <div className="loading-bar-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  const totalPages = pagination.totalPages || 1;

  const { search } = useOutletContext() || { search: '' };
  const q = search?.toLowerCase().trim() || '';

  const filteredUsers = q
    ? users.filter((u) => {
        return (
          u.username?.toLowerCase().includes(q) ||
          u.full_name?.toLowerCase().includes(q) ||
          u.role?.toLowerCase().includes(q)
        );
      })
    : users;

  const paginatedData = filteredUsers;

  const confirmDelete = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/users/${id}`,
      );
      notyfSuccess('USER_DELETED_SUCCESSFULLY');
      setCurrentPage(1);
      getUsers(1);
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: `
        <div class="text-yellow-400 mb-2">
          ${ReactDOMServer.renderToString(<AlertTriangle className="warning-icon" />)}
        </div>
        <span class="text-xl">DELETE_USER?</span>
    `,
      text: 'DELETED_DATA_CANNOT_BE_RECOVERED!',
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonColor: '#e63030',
      cancelButtonColor: '#2e2e2e',
      confirmButtonText: 'YES_DELETE!',
      cancelButtonText: 'CANCEL',
      color: '#f8fafc',
      borderRadius: '0',
      customClass: {
        popup: 'swal-dark-popup',
        confirmButton: 'my-swal-outline-btn',
        cancelButton: 'my-swal-outline-btn-cancel',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        confirmDelete(id);
      }
    });
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/users/edit/${id}`);
  };

  return (
    <div className="assets-wrapper">
      {/* HEADER */}
      <div className="assets-header">
        <div className="assets-header-left">
          <div className="assets-label"># MANAGE_USERS</div>
          <h1 className="assets-title">
            USER <em>LIST</em>
          </h1>
        </div>
        <div className="assets-header-right">
          <button
            className="btn-add"
            onClick={() => navigate('/dashboard/users/add')}
          >
            <span>+ ADD_USER</span>
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="assets-content">
        <div className="table-toolbar">
          <div className="table-toolbar-left">
            Total{' '}
            <span>{paginatedData.length || pagination.totalItems || 0}</span>{' '}
            users found
          </div>
        </div>

        <div className="table-scroll">
          <table className="table-assets">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData &&
                paginatedData.map((user, idx) => (
                  <tr key={user.id}>
                    <td>
                      {(currentPage - 1) * (pagination.itemsPerPage || 10) +
                        idx +
                        1}
                    </td>
                    <td>{user?.username}</td>
                    <td>{user?.full_name || 'John Doe'}</td>
                    <td>
                      <span
                        className={`role-badge role-${user.role.toLowerCase()}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(user.id)}
                      >
                        <SquarePen size={16} />
                      </button>
                      <button
                        className="btn-remove"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <div className="pagination-info">
            Halaman <span>{currentPage}</span> of <span>{totalPages}</span>
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

export default Users;
