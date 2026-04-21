import React, { useState, useEffect } from 'react';
import './Assets.css';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosInstance from '../../utils/axiosInstance';
import { getFullImageUrl } from '../../utils/getImageURL';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notyf';

const EditAssets = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [asset, setAsset] = useState({
    id: 0,
    category_id: 0,
    name: '',
    sku: '',
    description: '',
    image_url: '',
    status: '',
  });
  const [preview, setPreview] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const initData = async () => {
      return await Promise.all([getAssetById(), getCategories()]);
    };
    initData();
  }, []);

  const getCategories = async () => {
    setLoading(true);
    try {
      const categories = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/categories`,
      );
      setCategories(categories.data.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  const getAssetById = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/assets/${id}`,
      );
      setAsset({
        id: response.data.data.id,
        category_id: response.data.data.category_id,
        name: response.data.data.name,
        sku: response.data.data.sku,
        description: response.data.data.description,
        image_url: response.data.data.image_url,
        status: response.data.data.status,
      });
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-assets-container">
        <div className="loading-spinner">LOADING_ASSET_DATA...</div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        setAsset((prev) => ({
          ...prev,
          image_url: file,
        }));
        // Preview image
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
      return;
    }

    setAsset((prev) => ({
      ...prev,
      [name]: name === 'category_id' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('category_id', asset.category_id);
      formData.append('name', asset.name);
      formData.append('sku', asset.sku);
      formData.append('description', asset.description);
      formData.append('status', asset.status);

      if (asset.image_url instanceof File) {
        formData.append('image_url', asset.image_url);
      }

      await axiosInstance.put(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/assets/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      showSuccessNotification('ASSET_UPDATED_SUCCESSFULLY!');
      navigate(-1);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'FAILED!',
        text:
          error.response?.data?.message ||
          'Terjadi kesalahan saat memperbarui data',
        customClass: {
          popup: 'swal-cinematic-popup',
        },
        showClass: {
          popup: 'animate__animated animate__fadeInDown animate__faster',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp animate__faster',
        },
      });
      console.error(error.response);
      showErrorNotification();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-assets-container">
      <div className="edit-assets-header">
        <div className="assets-label"># ASSET MANAGEMENT</div>
        <h1 className="assets-title">
          EDIT <em>ASSET</em>
        </h1>
      </div>

      <form className="edit-assets-form" onSubmit={handleSubmit}>
        <div className="form-grid-container">
          {/* Grid Column 1 */}
          <div className="form-grid-column">
            <div className="form-group">
              <label htmlFor="assetName" className="form-label">
                ASSET_NAME
              </label>
              <input
                type="text"
                id="assetName"
                name="name"
                className="form-input"
                placeholder="Enter asset name"
                value={asset.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">
                CATEGORY
              </label>
              <select
                id="category"
                name="category_id"
                className="form-input"
                value={asset.category_id}
                onChange={handleChange}
                required
              >
                <option value="">SELECT_CATEGORY</option>
                {categories &&
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Grid Column 2 */}
          <div className="form-grid-column">
            <div className="form-group">
              <label htmlFor="sku" className="form-label">
                SKU
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                className="form-input"
                placeholder="Contoh: GOR78"
                value={asset.sku}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="form-input"
                value={asset.status}
                onChange={handleChange}
              >
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            {/* 
            <div className="form-group">
              <label className="form-label">Upload Gambar Aset</label>
              <div className="custom-file-upload">
                <label htmlFor="imageUrl" className="file-upload-label">
                  <span>PILIH FILE</span>
                </label>
                <input
                  type="file"
                  id="imageUrl"
                  name="image_url"
                  accept="image/*"
                  onChange={handleChange}
                />
                <div className="preview-frame">
                  {preview && (
                    <img
                      className="preview-image"
                      src={preview}
                      alt="image-preview"
                      width={220}
                    />
                  )}
                  {!preview &&
                    asset.image_url &&
                    typeof asset.image_url === 'string' && (
                      <img
                        className="preview-image"
                        src={getFullImageUrl(asset.image_url)}
                        alt="current-image"
                        width={220}
                      />
                    )}
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="form-group form-group-full">
          <label htmlFor="description" className="form-label">
            Deskripsi
          </label>
          <textarea
            id="description"
            name="description"
            className="form-textarea"
            placeholder="Masukkan deskripsi lengkap aset"
            rows="4"
            value={asset.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-add" disabled={loading}>
            <span>{loading ? 'UPDATING...' : 'UPDATE_ASSET'}</span>
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAssets;
