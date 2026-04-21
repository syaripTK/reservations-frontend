import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notyf';

const AddUsers = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await axiosInstance.post(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/users`,
        {
          username,
          full_name: fullName,
          password,
          role,
        },
      );
      showSuccessNotification('Data user berhasil ditambahkan!');
      navigate(-1);
    } catch (error) {
      console.error(error.response);
      showErrorNotification(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="add-assets-container">
      <div className="add-assets-header">
        <div className="assets-label"># Manajement User</div>
        <h1 className="assets-title">
          TAMBAH <em>USER</em>
        </h1>
      </div>

      <form className="add-assets-form" onSubmit={handleSubmit}>
        <div className="form-grid-container">
          <div className="form-grid-column">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="full_name" className="form-label">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                className="form-input"
                placeholder="Masukkan nama lengkap"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>
          {/* GRID 2 */}
          <div className="form-grid-column">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-grid-column">
              <div className="form-group">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  className="form-input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    -Pilih Role-
                  </option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-add" disabled={loading}>
            <span>{loading ? 'Menympan..' : 'Tambahkan user'}</span>
          </button>
          <button
            type="button"
            className="btn-reset"
            onClick={() => navigate(-1)}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUsers;
