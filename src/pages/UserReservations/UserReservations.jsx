import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import './UserReservations.css';
import axiosInstance from '../../utils/axiosInstance';
import { getFullImageUrl } from '../../utils/getImageURL';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notyf';
import { useNavigate } from 'react-router-dom';

const UserReservations = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [assetId, setAssetId] = useState(0);
  const [assets, setAssets] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAssets();
  }, []);

  const getAssets = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/assets`,
      );
      console.info(response.data.data);
      setAssets(response.data.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/reservations`,
        {
          asset_id: assetId,
          start_date: startDate,
          end_date: endDate,
        },
      );
      showSuccessNotification(response.data.message || 'Reservasi berhasil');
      navigate('/dashboard/history');
    } catch (error) {
      console.error(error.response);
      showErrorNotification(error.response.data.message || 'Reservasi gagal!');
    }
  };

  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -230, behavior: 'smooth' });
  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 230, behavior: 'smooth' });

  if (loading) {
    return (
      <div className="edit-assets-container">
        <div className="loading-wrapper">
          <div className="loading-spinner">Memuat Data...</div>
          <img src="/owi.jpeg" alt="owi" className="loading-image" />
          <div className="loading-bar-container">
            <div className="loading-bar-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reservations-wrapper">
      <div className="reservations-header">
        <p>// create</p>
        <h1 className="reservation-title">
          AJUKAN <em>RESERVASI</em>
        </h1>
      </div>
      <main className="reservatiomn-content">
        <form
          onSubmit={handleSubmit}
          id="newReservationForm"
          className="new-reservation"
        >
          <div className="form-grouped">
            <label htmlFor="asset_id">Asset</label>
            <select
              name="asset_id"
              id="asset_id"
              value={assetId}
              onChange={(e) => setAssetId(e.target.value)}
            >
              <option value="" disabled>
                =-Pilih Asset-=
              </option>
              {assets &&
                assets.map((asset) => (
                  <option value={asset.id} key={asset.id}>
                    {asset.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-grouped">
            <label htmlFor="start-date">Tanggal Mulai</label>
            <input
              id="start-date"
              name="start-date"
              type="date"
              className="input-start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-grouped">
            <label htmlFor="start-date">Tanggal Selesai</label>
            <input
              id="end-date"
              name="end-date"
              type="date"
              className="input-end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="button-res-wrapper">
            <button type="submit" className="btn-add">
              <span>Simpan</span>
            </button>
            <button type="reset" className="btn-reset">
              Reset
            </button>
          </div>
        </form>
      </main>
      <div className="reservation-footer">
        <h2>Daftar Asset</h2>
        <div className="asset-filter">
          <button className="filter-btn">all assets</button>
          <button className="filter-btn">available</button>
          <button className="filter-btn">booked</button>
          <button className="filter-btn">maintenance</button>
        </div>
        <div className="corousel">
          <div className="left-btn" onClick={scrollLeft}>
            <button>
              <ArrowLeftCircle />
            </button>
          </div>
          <div className="card-scroller">
            <div className="card-asset-wrapper" ref={scrollRef}>
              {/* Dummy */}
              {assets &&
                assets.map((asset) => (
                  <div className={`card-asset ${asset.status}`} key={asset.id}>
                    <div className="card-asset-header">
                      <img
                        src={getFullImageUrl(asset.image_url)}
                        alt=""
                        className="card-asset-image"
                      />
                    </div>
                    <div className="card-asset-body">
                      <span className={`card-badge ${asset.status}`}>
                        {asset.status}
                      </span>
                      <h2 className="asset-name">
                        {asset.name}{' '}
                        <span className="asset-id">({asset.id})</span>
                      </h2>
                      <small className="asset-desc">{asset.description}</small>
                    </div>
                    <div className="card-footer">
                      <p className="asset-category">Transportation</p>
                      <button className="card-select-btn">Pilih →</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="right-btn" onClick={scrollRight}>
            <button>
              <ArrowRightCircle />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReservations;
