import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import {
  notyfSuccess,
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
      const response = await axiosInstance.post(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/users`,
        {
          username,
          full_name: fullName,
          password,
          role,
        },
      );
      notyfSuccess(response.data.message);
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
        <div className="assets-label"># USER MANAGEMENT</div>
        <h1 className="assets-title">
          ADD <em>USER</em>
        </h1>
      </div>

      <form className="add-assets-form" onSubmit={handleSubmit}>
        <div className="form-grid-container">
          <div className="form-grid-column">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="full_name" className="form-label">
                FULL_NAME
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                className="form-input"
                placeholder="Enter full name"
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
                PASSWORD
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
                  ROLE
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
                    -SELECT_ROLE-
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
            <span>{loading ? 'SAVING...' : 'ADD_USER'}</span>
          </button>
          <button
            type="button"
            className="btn-reset"
            onClick={() => navigate(-1)}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUsers;
