import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { getFullImageUrl } from '../../utils/getImageURL';
import {
  AlertTriangle,
  ArrowBigLeft,
  ArrowBigRight,
  SquarePen,
  Trash2,
} from 'lucide-react';
import ReactDOMServer from 'react-dom/server';
import './Assets.css';
import Swal from 'sweetalert2';
import { notyfSuccess } from '../../utils/notyf';
import AssetCatalog from '../../component/LandingPage/AssetCatalog';

const Assets = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getAssets(currentPage);
  }, [currentPage]);

  const getAssets = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/assets?page=${page}`,
      );
      setAssets(response.data.data.data || response.data.data);
      setPagination(response.data.data.pagination || {});
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const result = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/categories`,
      );
      setCategories(result.data.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  // const filterData = assets.filter((asset) => {
  //   return asset.name?.toLowerCase().includes(search.toLowerCase())
  // })

  const totalPages = pagination.totalPages || 1;

  const { search } = useOutletContext() || { search: '' };
  const q = search?.toLowerCase().trim() || '';

  const filteredAssets = q
    ? assets.filter((asset) => {
        const cat = categories.find((c) => c.id === asset.category_id);
        const catName = cat ? cat.name : '';
        return (
          asset.name?.toLowerCase().includes(q) ||
          asset.sku?.toLowerCase().includes(q) ||
          catName?.toLowerCase().includes(q) ||
          asset.status?.toLowerCase().includes(q)
        );
      })
    : assets;

  const paginatedData = filteredAssets;

  const categoryName = (id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.name : '-';
  };

  const confirmDelete = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/admin/assets/${id}`,
      );
      notyfSuccess(response.data.message);
      setCurrentPage(1);
      getAssets(1);
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
        <span class="text-xl">DELETE_ASSET?</span>
    `,
      text: 'DELETED_ASSET_CANNOT_BE_RECOVERED!',
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

  const handleEdit = async (id) => {
    navigate(`/dashboard/assets/edit/${id}`);
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

  return (
    <div className="assets-wrapper">
      {/* HEADER */}
      <div className="assets-header">
        <div className="assets-header-left">
          <div className="assets-label"># ASSET MANAGEMENT</div>
          <h1 className="assets-title">
            ASSET <em>LIST</em>
          </h1>
        </div>
        <div className="assets-header-right">
          <button
            className="btn-add"
            onClick={() => navigate('/dashboard/assets/add')}
          >
            <span>+ ADD_ASSET</span>
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="assets-content">
        <div className="table-toolbar">
          <div className="table-toolbar-left">
            Total <span>{paginatedData.length || 0}</span> assets found
          </div>
        </div>

        <div className="table-scroll">
          <table className="table-assets">
            <thead>
              <tr>
                <th>#</th>
                <th>SKU</th>
                <th>Name</th>
                <th>Category</th>
                <th>status</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((asset, idx) => (
                <tr key={asset.id}>
                  <td>
                    {(currentPage - 1) * (pagination.itemsPerPage || 10) +
                      idx +
                      1}
                  </td>
                  <td>{asset.sku}</td>
                  <td>{asset.name}</td>
                  <td>{categoryName(asset.category_id)}</td>
                  <td>
                    <span
                      className={`status-badge status-${asset.status.toLowerCase()}`}
                    >
                      {asset.status}
                    </span>
                  </td>
                  <td>
                    <img src={getFullImageUrl(asset.image_url)} alt="gambar" />
                  </td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(asset.id)}
                    >
                      <SquarePen size={16} />
                    </button>
                    <button
                      className="btn-remove"
                      onClick={() => handleDelete(asset.id)}
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
              <ArrowBigLeft size={16} />
            </button>
            <button className="page-btn active">{currentPage}</button>
            <button
              className="page-btn"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage >= totalPages || totalPages === 0}
            >
              <ArrowBigRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;
