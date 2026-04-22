import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Share2,
  Heart,
  MapPin,
  Calendar,
  User,
  AlertCircle,
  Loader,
} from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { getFullImageUrl } from '../../utils/getImageURL';
import './AssetDetail.css';

const AssetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAssetDetail();
    }
  }, [id]);

  const fetchAssetDetail = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/assets/${id}`,
      );
      setAsset(response.data.data);
      console.info(response);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat detail asset');
      console.error('Error fetching asset detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `ASSET_REPORT: ${asset?.name}`,
          text: `Check detail for ${asset?.sku}: ${asset?.description}`,
          url: window.location.href,
        });
        console.log('SYSTEM_LOG: SHARE_SUCCESSFUL');
      } catch (error) {
        console.log('SYSTEM_LOG: SHARE_CANCELLED_BY_USER', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('LINK_COPIED_TO_CLIPBOARD (Browser does not support native share)');
    }
  };

  const handleRebook = async (assetId) => {
    localStorage.setItem('res_id', assetId);
    navigate('/dashboard/new_reservation');
  };

  if (loading) {
    return (
      <section className="asset-detail-loading-container">
        <div className="asset-detail-spinner">
          <Loader className="asset-detail-spinner-icon" />
          <p className="asset-detail-loading-text">Memuat detail asset...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="asset-detail-error-container">
        <div className="asset-detail-error-box">
          <AlertCircle className="asset-detail-error-icon" />
          <h2 className="asset-detail-error-title">Something went wrong</h2>
          <p className="asset-detail-error-message">{error}</p>
          <button
            className="asset-detail-error-button"
            onClick={handleBackClick}
          >
            Kembali
          </button>
        </div>
      </section>
    );
  }

  if (!asset) {
    return (
      <section className="asset-detail-not-found-container">
        <div className="asset-detail-not-found-box">
          <AlertCircle className="asset-detail-not-found-icon" />
          <h2 className="asset-detail-not-found-title">
            Asset Tidak Ditemukan
          </h2>
          <button
            className="asset-detail-not-found-button"
            onClick={handleBackClick}
          >
            Kembali
          </button>
        </div>
      </section>
    );
  }

  return (
    <article className="asset-detail-wrapper">
      {/* Header Navigation */}
      <header className="asset-detail-header">
        <button
          className="asset-detail-back-button"
          onClick={handleBackClick}
          aria-label="Kembali ke halaman sebelumnya"
        >
          <ChevronLeft className="asset-detail-back-icon" />
          <span className="asset-detail-back-text">Kembali</span>
        </button>

        <div className="asset-detail-actions-header">
          <button
            className="asset-detail-action-button asset-detail-share-button"
            onClick={handleShare}
            aria-label="Bagikan asset ini"
          >
            <Share2 className="asset-detail-action-icon" />
          </button>

          <button
            className={`asset-detail-action-button asset-detail-favorite-button ${
              isFavorite ? 'asset-detail-favorite-active' : ''
            }`}
            onClick={handleFavoriteToggle}
            aria-label="Tambah ke favorit"
          >
            <Heart
              className="asset-detail-action-icon"
              fill={isFavorite ? 'currentColor' : 'none'}
            />
          </button>
        </div>
      </header>

      <div className="asset-detail-content">
        {/* Gallery Section */}
        <section
          className="asset-detail-gallery-section"
          aria-label="Galeri gambar asset"
        >
          <figure className="asset-detail-gallery-figure">
            {asset?.image_url ? (
              <>
                <img
                  src={getFullImageUrl(asset.image_url)}
                  alt={asset.name}
                  className="asset-detail-gallery-image"
                />
                <figcaption className="asset-detail-gallery-caption">
                  {asset.name}
                </figcaption>
              </>
            ) : (
              <div className="asset-detail-no-image">
                <p>Tidak ada gambar tersedia</p>
              </div>
            )}
          </figure>
        </section>

        <div className="asset-detail-main">
          <header className="asset-detail-title-section">
            <h1 className="asset-detail-title">{asset?.name}</h1>
            {asset?.category && (
              <p className="asset-detail-category">{asset.category?.name}</p>
            )}
          </header>

          {asset?.description && (
            <section
              className="asset-detail-description-section"
              aria-label="Deskripsi"
            >
              <h2 className="asset-detail-section-title">Deskripsi</h2>
              <div className="asset-detail-description-content">
                <p>{asset.description}</p>
              </div>
            </section>
          )}

          <section
            className="asset-detail-reservation-section"
            aria-label="Pemesanan"
          >
            <h2 className="asset-detail-section-title">Pemesanan</h2>
            <div className="asset-detail-reservation-info">
              {asset?.status === 'available' ? (
                <>
                  <p className="asset-detail-available">
                    Tersedia untuk pemesanan
                  </p>
                  <button
                    className="asset-detail-reserve-button"
                    onClick={() => handleRebook(asset?.id)}
                  >
                    Pesan Sekarang
                  </button>
                </>
              ) : (
                <p className="asset-detail-unavailable">
                  Tidak tersedia pada saat ini
                </p>
              )}
            </div>
          </section>
        </div>
      </div>

      <footer className="asset-detail-footer">
        <div className="asset-detail-footer-content">
          <p className="asset-detail-footer-info">
            Asset ID: <code>{asset?.id}</code>
          </p>
        </div>
      </footer>
    </article>
  );
};

export default AssetDetail;
