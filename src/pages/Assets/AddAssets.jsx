import React, { useEffect, useState } from 'react';
import './Assets.css';
import { ArrowBigLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Swal from 'sweetalert2';
import {
  notyfSuccess,
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notyf';

const AddAssets = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [sku, setSKU] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/categories`,
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/assets`,
        {
          name,
          sku,
          category_id: parseInt(categoryId),
          description,
          image,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      notyfSuccess(response.data.message || 'NEW_ASSET_REGISTERED_IN_SYSTEM');
      navigate(-1);
    } catch (error) {
      console.error(error.response);
      showErrorNotification(
        error.response.data.message || 'Oopss.. terjadi kesalahan!',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-assets-container">
      <div className="add-assets-header">
        <div className="assets-label">
          <p># ASSET MANAGEMENT</p>
          <h1 className="assets-title">
            ADD <em>ASSET</em>
          </h1>
        </div>
      </div>
      <form className="add-assets-form" onSubmit={handleSubmit}>
        <div className="form-grid-container">
          <div className="form-grid-column">
            <div className="form-group">
              <label htmlFor="assetName" className="form-label">
                ASSET_NAME
              </label>
              <input
                type="text"
                id="assetName"
                name="assetName"
                className="form-input"
                placeholder="Enter asset name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">
                CATEGORY
              </label>
              <select
                id="category"
                name="category"
                className="form-input"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option value="" disabled>
                  -SELECT_CATEGORY-
                </option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* GRID 2 */}
          <div className="form-grid-column">
            <div className="form-group">
              <label htmlFor="location" className="form-label">
                SKU <small className="assets-label">(stok keeping unit)</small>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="form-input"
                placeholder="Contoh: PTR35"
                value={sku}
                onChange={(e) => setSKU(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Upload Gambar Aset</label>
              <div className="custom-file-upload">
                <label htmlFor="imageUrl" className="file-upload-label">
                  <span>CHOOSE FILE</span>
                </label>
                <input
                  type="file"
                  id="imageUrl"
                  name="imageUrl"
                  accept="image/*"
                  onChange={handleChangeImage}
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group form-group-full">
          <label htmlFor="description" className="form-label">
            DESCRIPTION
          </label>
          <textarea
            id="description"
            name="description"
            className="form-textarea"
            placeholder="Enter detailed asset description"
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-add">
            <span>{loading ? 'SAVING...' : 'SAVE_ASSET'}</span>
          </button>
          <button
            type="button"
            className="btn-reset"
            onClick={() => navigate(-1)}
          >
            BACK
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAssets;
