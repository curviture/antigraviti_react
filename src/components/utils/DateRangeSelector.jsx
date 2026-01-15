import React, { useState, useEffect } from 'react';

import Spinner from './Spinner/Spinner'


function DateRangeSelector({ startDate, endDate, onChange }) {

    // Helper to update just the start date, bubbling up both
    const handleStartChange = (newDate) => {
        onChange({ startDate: newDate, endDate: endDate });
    };

    // Helper to update just the end date, bubbling up both
    const handleEndChange = (newDate) => {
        onChange({ startDate: startDate, endDate: newDate });
    };

    return (
        <div style={{ display: 'flex', gap: '2rem' }}>
            <div>
                <Spinner
                    initialDate={startDate}
                    onChange={handleStartChange}
                />
            </div>
            <div>
                <Spinner
                    initialDate={endDate}
                    onChange={handleEndChange}
                />
            </div>
        </div>
    );
}

export default DateRangeSelector;
