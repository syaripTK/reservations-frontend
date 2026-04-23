import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import './MyHistory.css';
import { notyfError, notyfSuccess } from '../../utils/notyf';
import formatDate from '../../utils/date/formatDate';
import calculateRemains from '../../utils/date/calculateRemains';

const MyHistory = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getMyReservations();
  }, []);

  const getMyReservations = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/reservations/my-reservations`,
      );
      console.info(response.data);
      setReservations(response.data.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleReturn = async (id) => {
    try {
      const response = await axiosInstance.put(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/reservations/${id}/return`,
      );
      notyfSuccess(response.data.message);
      getMyReservations();
    } catch (error) {
      console.error(error.response);
      notyfError(error.response.data.message);
    }
  };

  const { search } = useOutletContext() || { search: '' };
  const q = search?.toLowerCase().trim() || '';

  const filteredReservations = q
    ? reservations.filter((r) => {
        return (
          r.asset?.name?.toLowerCase().includes(q) ||
          r.asset?.sku?.toLowerCase().includes(q) ||
          r.status?.toLowerCase().includes(q)
        );
      })
    : reservations;

  const totalReservations = reservations.length;
  const activeAssets = reservations.filter(
    (r) => r.status === 'approved',
  ).length;
  const pendingQueue = reservations.filter(
    (r) => r.status === 'pending',
  ).length;
  const hasActiveReservations = activeAssets > 0;
  const mostRecentActive = reservations.find((r) => r.status === 'approved');

  const handleRebook = async (oldReservationId) => {
    localStorage.setItem('rebook_id', oldReservationId);
    navigate('/dashboard/new_reservation');
  };

  const handleCancel = async (reservationId) => {
    try {
      const response = await axiosInstance.delete(
        `${import.meta.env.PUBLIC_API_URL}/api/v1/reservations/${reservationId}/cancel`,
      );
      notyfSuccess(response.data.message);
      getMyReservations();
    } catch (error) {
      console.error(error.response);
      notyfError(error.response.data.message);
    }
  };

  return (
    <div className="history-log">
      {/* ===== HEADER COMPONENT ===== */}
      <header className="history-log__header">
        <div className="history-log__title-wrapper">
          <div className="assets-label">// history log</div>
          <h1 className="history-log__title">
            MY <span className="brand">HISTORY</span>
          </h1>
        </div>
      </header>

      {/* ===== STATS/OVERVIEW SECTION ===== */}
      <section className="history-log__stats" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="visually-hidden">
          Overview Statistics
        </h2>

        <div className="stats-grid">
          {/* Metric Card 1: Total Reservations */}
          <article className="metric-card metric-card--total">
            <h3 className="metric-card__label">TOTAL_RESERVATIONS</h3>
            <div className="metric-card__value">{totalReservations}</div>
            <p className="metric-card__description">All time records</p>
          </article>

          {/* Metric Card 2: Active Assets */}
          <article className="metric-card metric-card--active">
            <h3 className="metric-card__label">ACTIVE_ASSETS</h3>
            <div className="metric-card__value">{activeAssets}</div>
            <p className="metric-card__description">Currently approved</p>
          </article>

          {/* Metric Card 3: Pending Queue */}
          <article className="metric-card metric-card--pending">
            <h3 className="metric-card__label">PENDING_QUEUE</h3>
            <div className="metric-card__value">{pendingQueue}</div>
            <p className="metric-card__description">Awaiting approval</p>
          </article>
        </div>
      </section>

      {/* ===== ACTIVE MONITOR SECTION (CONDITIONAL) ===== */}
      {hasActiveReservations && (
        <section
          className="history-log__active-monitor"
          aria-labelledby="active-monitor-heading"
        >
          <h2 id="active-monitor-heading" className="active-monitor__title">
            ACTIVE_MONITOR
          </h2>

          <article className="focus-card">
            <div className="focus-card__header">
              <h3 className="focus-card__asset-name">
                {mostRecentActive?.asset?.name}
              </h3>
              <span className="focus-card__sku">
                {mostRecentActive?.asset?.sku}
              </span>
            </div>

            <div className="focus-card__content">
              <div className="focus-card__info-group">
                <dt className="focus-card__label">Start Date</dt>
                <dd className="focus-card__value">
                  {formatDate(mostRecentActive?.start_date)}
                </dd>
              </div>

              <div className="focus-card__info-group">
                <dt className="focus-card__label">End Date</dt>
                <dd className="focus-card__value">
                  {formatDate(mostRecentActive?.end_date)}
                </dd>
              </div>

              <div className="focus-card__info-group">
                <dt className="focus-card__label">Days Remaining</dt>
                <dd className="focus-card__countdown">
                  <span className="countdown__value">
                    {calculateRemains(
                      mostRecentActive?.start_date,
                      mostRecentActive?.end_date,
                    )}
                  </span>
                </dd>
              </div>
            </div>

            <div className="focus-card__actions">
              <button
                type="button"
                className="btn btn--return"
                aria-label="Return asset"
                onClick={() => handleReturn(mostRecentActive.id)}
              >
                <span>RETURN_ASSET</span>
              </button>
            </div>
          </article>
        </section>
      )}

      {reservations.length === 0 ? (
        <section className="history-log__empty-state">
          <div className="empty-state__container">
            <h2 className="empty-state__title">
              NO DATA ENCOUNTERED IN SYSTEM LOGS
            </h2>
            <p className="empty-state__message">
              Start by creating your first reservation
            </p>
          </div>
        </section>
      ) : (
        <section
          className="history-log__table-section"
          aria-labelledby="table-heading"
        >
          <h2 id="table-heading" className="visually-hidden">
            Reservation History Table
          </h2>

          <div className="table-wrapper">
            <table className="history-log__table">
              <thead className="history-log__table-head">
                <tr className="table__header-row">
                  <th
                    className="table__header-cell table__header-cell--no"
                    scope="col"
                  >
                    No
                  </th>
                  <th
                    className="table__header-cell table__header-cell--asset"
                    scope="col"
                  >
                    Asset Details
                  </th>
                  <th
                    className="table__header-cell table__header-cell--duration"
                    scope="col"
                  >
                    Duration (Range)
                  </th>
                  <th
                    className="table__header-cell table__header-cell--request-date"
                    scope="col"
                  >
                    Request Date
                  </th>
                  <th
                    className="table__header-cell table__header-cell--status"
                    scope="col"
                  >
                    Status
                  </th>
                  <th
                    className="table__header-cell table__header-cell--actions"
                    scope="col"
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="history-log__table-body">
                {filteredReservations.map((reservation, index) => (
                  <tr
                    key={reservation.id}
                    className="table__row"
                    data-status={reservation.status}
                  >
                    <td className="table__cell table__cell--no">
                      <span className="table__cell-content">{index + 1}</span>
                    </td>

                    <td className="table__cell table__cell--asset">
                      <div className="asset-details">
                        <span className="asset-details__name">
                          {reservation.asset?.name}
                        </span>
                        <span className="asset-details__sku">
                          {reservation.asset?.sku}
                        </span>
                      </div>
                    </td>

                    <td className="table__cell table__cell--duration">
                      <span className="table__cell-content">
                        {formatDate(reservation.start_date)} to{' '}
                        {formatDate(reservation.end_date)}
                      </span>
                    </td>

                    <td className="table__cell table__cell--request-date">
                      <time className="table__cell-content">
                        {formatDate(reservation.request_date)}
                      </time>
                    </td>

                    <td className="table__cell table__cell--status">
                      <span
                        className={`history-status-badge history-status-badge--${reservation.status}`}
                        role="status"
                        aria-label={`Status: ${reservation.status}`}
                      >
                        {reservation.status.toUpperCase()}
                      </span>
                      {reservation.status === 'rejected' ? (
                        <div className="rejection-note">
                          <strong>REASON:</strong>{' '}
                          {reservation.reject_reason ||
                            'No specific reason provided.'}
                        </div>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>

                    <td className="table__cell table__cell--actions">
                      <div className="action-buttons">
                        {reservation.status === 'pending' && (
                          <button
                            type="button"
                            className="btn btn--cancel"
                            aria-label="Cancel pending reservation"
                            onClick={() => handleCancel(reservation.id)}
                          >
                            CANCEL
                          </button>
                        )}

                        {reservation.status === 'approved' && (
                          <button
                            type="button"
                            className="btn btn--return"
                            aria-label="Return approved asset"
                            onClick={() => handleReturn(reservation.id)}
                          >
                            <span>RETURN</span>
                          </button>
                        )}

                        {(reservation.status === 'returned' ||
                          reservation.status === 'rejected') && (
                          <a
                            href="#rebook"
                            className="btn btn--rebook"
                            aria-label="Re-book returned or rejected asset"
                            onClick={() => handleRebook(reservation.id)}
                          >
                            RE-BOOK
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default MyHistory;
