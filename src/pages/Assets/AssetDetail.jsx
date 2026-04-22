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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch asset detail from API
  useEffect(() => {
    const fetchAssetDetail = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `${import.meta.env.PUBLIC_API_URL}/api/v1/assets/${id}`,
        );
        setAsset(response.data.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Gagal memuat detail asset');
        console.error('Error fetching asset detail:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAssetDetail();
    }
  }, [id]);

  // Handle back navigation
  const handleBackClick = () => {
    navigate(-1);
  };

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement API call to add/remove from favorites
  };

  // Handle share
  const handleShare = async () => {
    // TODO: Implement share functionality
    if (navigator.share) {
      await navigator.share({
        title: asset?.name,
        text: asset?.description,
        url: window.location.href,
      });
    }
  };

  // Handle next image
  const handleNextImage = () => {
    if (asset?.images && asset.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % asset.images.length);
    }
  };

  // Handle previous image
  const handlePreviousImage = () => {
    if (asset?.images && asset.images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + asset.images.length) % asset.images.length,
      );
    }
  };

  // Loading state
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

  // Error state
  if (error) {
    return (
      <section className="asset-detail-error-container">
        <div className="asset-detail-error-box">
          <AlertCircle className="asset-detail-error-icon" />
          <h2 className="asset-detail-error-title">Terjadi Kesalahan</h2>
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

  // Not found state
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
            {asset?.images && asset.images.length > 0 ? (
              <>
                <img
                  src={getFullImageUrl(asset.images[currentImageIndex])}
                  alt={`${asset.name} - Gambar ${currentImageIndex + 1}`}
                  className="asset-detail-gallery-image"
                />
                <figcaption className="asset-detail-gallery-caption">
                  {asset.name}
                </figcaption>

                {asset.images.length > 1 && (
                  <div className="asset-detail-gallery-controls">
                    <button
                      className="asset-detail-gallery-button asset-detail-gallery-prev"
                      onClick={handlePreviousImage}
                      aria-label="Gambar sebelumnya"
                    >
                      &#10094;
                    </button>
                    <span className="asset-detail-gallery-counter">
                      {currentImageIndex + 1} / {asset.images.length}
                    </span>
                    <button
                      className="asset-detail-gallery-button asset-detail-gallery-next"
                      onClick={handleNextImage}
                      aria-label="Gambar berikutnya"
                    >
                      &#10095;
                    </button>
                  </div>
                )}

                <div className="asset-detail-gallery-thumbnails">
                  {asset.images.map((image, index) => (
                    <button
                      key={index}
                      className={`asset-detail-gallery-thumbnail ${
                        index === currentImageIndex
                          ? 'asset-detail-gallery-thumbnail-active'
                          : ''
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Pilih gambar ${index + 1}`}
                    >
                      <img
                        src={getFullImageUrl(image)}
                        alt={`Thumbnail ${index + 1}`}
                      />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="asset-detail-no-image">
                <p>Tidak ada gambar tersedia</p>
              </div>
            )}
          </figure>
        </section>

        {/* Main Content Area */}
        <div className="asset-detail-main">
          {/* Title and Basic Info */}
          <header className="asset-detail-title-section">
            <h1 className="asset-detail-title">{asset?.name}</h1>
            {asset?.category && (
              <p className="asset-detail-category">{asset.category}</p>
            )}
          </header>

          {/* Description */}
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

          {/* Specifications/Details */}
          <section
            className="asset-detail-specs-section"
            aria-label="Spesifikasi"
          >
            <h2 className="asset-detail-section-title">Informasi Detail</h2>
            <dl className="asset-detail-specs-list">
              {asset?.location && (
                <div className="asset-detail-spec-item">
                  <dt className="asset-detail-spec-label">
                    <MapPin className="asset-detail-spec-icon" />
                    Lokasi
                  </dt>
                  <dd className="asset-detail-spec-value">{asset.location}</dd>
                </div>
              )}

              {asset?.condition && (
                <div className="asset-detail-spec-item">
                  <dt className="asset-detail-spec-label">Kondisi</dt>
                  <dd className="asset-detail-spec-value">{asset.condition}</dd>
                </div>
              )}

              {asset?.yearAcquired && (
                <div className="asset-detail-spec-item">
                  <dt className="asset-detail-spec-label">
                    <Calendar className="asset-detail-spec-icon" />
                    Tahun Perolehan
                  </dt>
                  <dd className="asset-detail-spec-value">
                    {asset.yearAcquired}
                  </dd>
                </div>
              )}

              {asset?.owner && (
                <div className="asset-detail-spec-item">
                  <dt className="asset-detail-spec-label">
                    <User className="asset-detail-spec-icon" />
                    Pemilik
                  </dt>
                  <dd className="asset-detail-spec-value">{asset.owner}</dd>
                </div>
              )}
            </dl>
          </section>

          {/* Reservation Section */}
          <section
            className="asset-detail-reservation-section"
            aria-label="Pemesanan"
          >
            <h2 className="asset-detail-section-title">Pemesanan</h2>
            <div className="asset-detail-reservation-info">
              {asset?.available ? (
                <>
                  <p className="asset-detail-available">
                    Tersedia untuk pemesanan
                  </p>
                  <button className="asset-detail-reserve-button">
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

      {/* Footer */}
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
