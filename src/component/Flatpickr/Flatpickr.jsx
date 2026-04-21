import React from 'react';
import './Flatpickr.css';
const AssetDatePicker = ({ selectedDate, onDateChange }) => {
  return (
    <div className="datepicker-container">
      <label className="datepicker-label">SYSTEM_DATE_ACCESS</label>
      <div className="datepicker-input-wrapper">
        <input
          type="date"
          value={selectedDate || ''}
          onChange={(e) => onDateChange(e.target.value)}
          className="datepicker-input"
        />
        <span className="datepicker-decoration">[ REQ_LOG ]</span>
      </div>
      {selectedDate && (
        <small className="datepicker-status">LOCKED_DATE: {selectedDate}</small>
      )}
    </div>
  );
};

export default AssetDatePicker;
