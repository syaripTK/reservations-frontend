import { Folder } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import './Category.css';
import {
  notyfError,
  notyfSuccess,
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notyf';
import Swal from 'sweetalert2';

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [namaKategori, setNamaKategori] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [loading, setLoading] = useState(false);
  const { search } = useOutletContext() || { search: '' };
  const initialState = {
    namaKategori: '',
    deskripsi: '',
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/categories`,
      );
      console.info(response.data);
      setCategories(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/categories`,
        {
          name: namaKategori,
          description: deskripsi,
        },
      );
      notyfSuccess(response.data.message);
      setNamaKategori(initialState.namaKategori);
      setDeskripsi(initialState.deskripsi);
      getCategories();
    } catch (error) {
      console.error(error.response);
      notyfError(error.response.data.message || 'FAILED_TO_SAVE_CATEGORY');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = async (category, refreshData) => {
    const { value: formValues } = await Swal.fire({
      title: `<div class="swal-brutalist-title">EDIT // CATEGORY</div>`,
      html: `
      <div class="swal-brutalist-body">
        <div class="input-group">
          <label>CATEGORY NAME</label>
          <input id="swal-cat-name" class="custom-swal-input" value="${category.name}" placeholder="...">
        </div>
        
        <div class="input-group">
          <label>DESCRIPTION</label>
          <textarea id="swal-cat-desc" class="custom-swal-textarea" placeholder="Optional details...">${category.description || ''}</textarea>
        </div>
      </div>
    `,
      background: '#0a0a0a',
      showCancelButton: true,
      confirmButtonText: 'SAVE',
      cancelButtonText: 'CANCEL',
      buttonsStyling: false,
      customClass: {
        popup: 'swal-brutalist-popup',
        confirmButton: 'swal-btn-confirm',
        cancelButton: 'swal-btn-cancel',
      },
      preConfirm: () => {
        const name = document.getElementById('swal-cat-name').value;
        const description = document.getElementById('swal-cat-desc').value;
        if (!name) return Swal.showValidationMessage('NAME IS REQUIRED');
        return { name, description };
      },
    });

    if (formValues) {
      try {
        await axiosInstance.put(
          `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/categories/${category.id}`,
          formValues,
        );

        notyfSuccess('CATEGORY UPDATED');
        if (refreshData) refreshData();
      } catch (error) {
        notyfError(error.response?.data?.message || 'CATEGORY_UPDATE_FAILED');
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const deleted = await axiosInstance.delete(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/categories/${id}`,
      );
      notyfSuccess(deleted.data.message);
      getCategories;
    } catch (error) {
      console.error(error.response);
      notyfError(error.response.data.message || 'FAILED_TO_DELETE_DATA');
    }
  };
  return (
    <div className="category-page-container">
      <div className="category-header-section">
        <p className="assets-label">// MANAGE CATEGORIES</p>
        <h1 className="category-page-title">CATEGORIES</h1>
      </div>
      <div className="category-cards-wrapper">
        <div className="category-cards-grid">
          {(() => {
            const q = search?.toLowerCase().trim() || '';
            const filtered = q
              ? categories.filter((cat) => {
                  return (
                    cat.name?.toLowerCase().includes(q) ||
                    (cat.description || '').toLowerCase().includes(q)
                  );
                })
              : categories;

            return (
              filtered &&
              filtered.map((cat) => (
                <div key={cat.id} className="category-card-item">
                  <div className="category-card-content">
                    <div className="category-card-icon">
                      <Folder />
                    </div>
                    <h3 className="category-card-title">{cat.name}</h3>
                    <p className="category-card-description">
                      {cat.description != null ? cat.description : '-'}
                    </p>
                  </div>
                  <div className="category-card-actions">
                    <button
                      className="category-card-edit-btn"
                      onClick={() => handleEditCategory(cat, getCategories)}
                    >
                      Edit
                    </button>
                    <button
                      className="category-card-delete-btn"
                      onClick={() => handleDeleteCategory(cat.id)}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))
            );
          })()}
        </div>
      </div>

      <div className="add-category-section">
        <div className="add-category-container">
          <h2 className="add-category-title">ADD_NEW_CATEGORY</h2>

          <form
            onSubmit={handleSubmit}
            id="formCategory"
            className="add-category-form"
          >
            <div className="form-group-wrapper">
              <div className="form-group">
                <label
                  htmlFor="category-name"
                  className="form-label-category-name"
                >
                  CATEGORY_NAME
                </label>
                <input
                  type="text"
                  id="category-name"
                  className="form-input-category-name"
                  placeholder="Enter category name"
                  value={namaKategori}
                  onChange={(e) => setNamaKategori(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="category-description"
                  className="form-label-category-description"
                >
                  DESCRIPTION
                </label>
                <textarea
                  id="category-description"
                  className="form-textarea-category-description"
                  placeholder="Enter category description"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows="4"
                />
              </div>
            </div>

            <div className="form-actions-wrapper">
              <button
                type="submit"
                className="form-submit-btn-category"
                disabled={loading}
              >
                <span>{loading ? 'SAVING...' : 'ADD_CATEGORY'}</span>
              </button>
              <button type="reset" className="form-reset-btn-category">
                CLEAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Category;
