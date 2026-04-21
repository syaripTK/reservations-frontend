import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notyf';

const EditUsers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/users/${id}`,
      );
      const user = response.data.data;
      console.info(user);
      setUsername(user.username);
      setFullName(user.full_name);
      setRole(user.role);
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await axiosInstance.put(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/users/${id}`,
        {
          username,
          full_name: fullName,
          role,
        },
      );
      showSuccessNotification('USER_DATA_UPDATED_SUCCESSFULLY');
      navigate(-1);
    } catch (error) {
      console.error(error.response);

      const apiErrors = error.response?.data?.errors || [];
      if (apiErrors.length > 0) {
        const errorPerField = {};
        apiErrors.forEach((e) => {
          errorPerField[e.path] = e.msg;
        });
        setErrors(errorPerField);
      } else {
        showErrorNotification(error.response.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="add-assets-container">
      <div className="add-assets-header">
        <div className="assets-label"># USER MANAGEMENT</div>
        <h1 className="assets-title">
          UPDATE <em>USER</em>
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
              {errors.username && (
                <span className="error" style={{ color: 'red' }}>
                  {errors.username}
                </span>
              )}
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
              {errors.full_name && (
                <span className="error" style={{ color: 'red' }}>
                  {errors.full_name}
                </span>
              )}
            </div>
          </div>
          {/* GRID 2 */}
          <div className="form-grid-column">
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
                {errors.role && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.role}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-add" disabled={loading}>
            <span>{loading ? 'SAVING...' : 'SAVE_CHANGES'}</span>
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

export default EditUsers;
