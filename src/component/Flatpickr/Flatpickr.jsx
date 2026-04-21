import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import './Flatpickr.css';

const AssetDatePicker = ({ selectedDate, onDateChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="datepicker-container">
      <label className="input-label">RESERVATION_DATE</label>

      {/* Input Trigger */}
      <input
        readOnly
        className="brutalist-input"
        value={selectedDate ? format(selectedDate, 'PPP') : 'SELECT DATE'}
        onClick={() => setShowCalendar(!showCalendar)}
      />

      {/* Popover Calendar */}
      {showCalendar && (
        <div className="calendar-popover">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              onDateChange(date);
              setShowCalendar(false);
            }}
            disabled={{ before: new Date() }}
          />
        </div>
      )}
    </div>
  );
};

export default AssetDatePicker;
