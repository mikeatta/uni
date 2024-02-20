import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ selected, onChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (date) => {
    onChange(date); // Pass the selected date to the parent component
    setShowDatePicker(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setShowDatePicker(!showDatePicker)}
        style={{
          padding: '0.5rem',
          borderRadius: '0.25rem',
          border: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1em'
          height='1em'
          viewBox='0 0 48 48'
          style={{ marginRight: '0.5rem' }}
        >
          <mask id='ipSApplication0'>
            <g fill='none' stroke='#fff' strokeLinejoin='round' strokeWidth='4'>
              <path strokeLinecap='round' d='M40.04 22v20h-32V22'></path>
              <path
                fill='#fff'
                d='M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z'
              ></path>
            </g>
          </mask>
          <path
            fill='currentColor'
            d='M0 0h48v48H0z'
            mask='url(#ipSApplication0)'
          ></path>
        </svg>
        Select Date
      </button>
      {showDatePicker && (
        <div style={{ position: 'absolute', zIndex: 999 }}>
          <DatePicker selected={selected} onChange={handleDateChange} inline />
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
