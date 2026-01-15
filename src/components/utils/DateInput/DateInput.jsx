import React from 'react';
import Spinner from '../Spinner/Spinner';
import './DateInput.css';

const DateInput = ({ initialDate, onChange, minDate, maxDate, label }) => {

    const handleDateChange = (newDate) => {
        if (onChange) onChange(newDate);
    };

    return (
        <div className="date-input-container">
            {label && <label className="date-input-label">{label}</label>}

            <div className="date-input-controls">
                <Spinner
                    initialDate={initialDate}
                    onChange={handleDateChange}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            </div>
        </div>
    );
};

export default DateInput;
