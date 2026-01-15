import React, { useRef, useEffect, useState } from 'react';
import './Spinner.css';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 11 }, (_, i) => currentYear + i); // Current year + 10 years

const SpinnerWheel = ({ items = [], selected, onChange, type, min = 1, max = 999, onOverflow, isStepDisabled }) => {
    const rootRef = useRef(null);
    const itemWidth = 60; // Must match CSS

    const isNumeric = !items || items.length === 0;

    // Determine fast step based on type
    let fastStep = 5;
    if (type === 'month') fastStep = 3;
    if (type === 'year') fastStep = 2;
    if (isNumeric) fastStep = 5;

    // Initial scroll to selected item (only for non-numeric)
    useEffect(() => {
        if (!isNumeric && rootRef.current) {
            const index = items.indexOf(selected);
            if (index !== -1) {
                rootRef.current.scrollLeft = index * itemWidth;
            }
        }
    }, [items, selected, isNumeric]);

    const handleScroll = (e) => {
        if (isNumeric) return;
        const scrollLeft = e.target.scrollLeft;
        const index = Math.round(scrollLeft / itemWidth);

        if (items[index] !== undefined && items[index] !== selected) {
            onChange(items[index]);
        }
    };

    const navigate = (step) => {
        if (isNumeric) {
            // Treat empty/invalid as 0 for navigation purposes, or start from min
            let currentVal = Number(selected);
            if (isNaN(currentVal)) currentVal = min;

            let newValue = currentVal + step;

            if (newValue < min) {
                if (onOverflow) {
                    onOverflow(-1, step);
                    return;
                }
                newValue = min;
            }
            if (newValue > max) {
                if (onOverflow) {
                    onOverflow(1, step);
                    return;
                }
                newValue = max;
            }
            onChange(newValue);
            return;
        }

        const currentIndex = items.indexOf(selected);
        if (currentIndex === -1) return;

        let newIndex = currentIndex + step;

        // Clamp or Overflow logic
        if (newIndex < 0) {
            if (onOverflow) {
                onOverflow(-1, step);
                return;
            }
            newIndex = 0;
        }
        if (newIndex >= items.length) {
            if (onOverflow) {
                onOverflow(1, step);
                return;
            }
            newIndex = items.length - 1;
        }

        if (isStepDisabled && isStepDisabled(step)) return;

        onChange(items[newIndex]);
    };

    const handleInputChange = (e) => {
        const valStr = e.target.value;

        // Allow empty string to let user clear the input
        if (valStr === '') {
            onChange('');
            return;
        }

        let val = parseInt(valStr, 10);

        // If it's not a number (and not empty which is handled above), ignore or reset
        // But for standard number input, validity is usually handled by browser (stops non-digits).

        if (isNaN(val)) return;

        if (val > max) val = max;
        // Do not clamp min here to allow typing "10" (user types 1, then 0). 
        // If min is 5, typing 1 would be clamped to 5 immediately, preventing 10.

        onChange(val);
    };

    const handleInputBlur = () => {
        let val = Number(selected);
        if (selected === '' || isNaN(val)) {
            onChange(min);
            return;
        }
        if (val < min) onChange(min);
        if (val > max) onChange(max);
    };

    // Icons
    const ArrowLeft = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
    );
    const ArrowRight = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
    );
    const DoubleArrowLeft = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 5-5" /><path d="M18 17l-5-5 5-5" /></svg>
    );
    const DoubleArrowRight = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5" /><path d="M6 17l5-5-5-5" /></svg>
    );

    const isStepActuallyDisabled = (step) => {
        if (isStepDisabled && isStepDisabled(step)) return true;

        if (isNumeric) {
            let currentVal = Number(selected);
            if (isNaN(currentVal)) currentVal = min;
            let newValue = currentVal + step;
            return newValue < min || newValue > max;
        } else {
            const currentIndex = items.indexOf(selected);
            if (currentIndex === -1) return true;
            let newIndex = currentIndex + step;
            return newIndex < 0 || newIndex >= items.length;
        }
    };

    return (
        <div className="spinner-row">
            <div className="spinner-controls spinner-controls--left">
                <button
                    className="spinner-btn"
                    onClick={() => navigate(-fastStep)}
                    title={`Back ${fastStep}`}
                    disabled={isStepActuallyDisabled(-fastStep)}
                >
                    <DoubleArrowLeft />
                </button>
                <button
                    className="spinner-btn"
                    onClick={() => navigate(-1)}
                    disabled={isStepActuallyDisabled(-1)}
                >
                    <ArrowLeft />
                </button>
            </div>

            {isNumeric ? (
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <input
                        className="spinner-input"
                        type="number"
                        value={selected}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        min={min}
                        max={max}
                    />
                </div>
            ) : (
                <div className="spinner-track" ref={rootRef} onScroll={handleScroll}>
                    <div className="spinner-padder-horizontal" />
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`spinner-item ${item === selected ? 'selected' : ''}`}
                            onClick={() => {
                                if (rootRef.current) {
                                    rootRef.current.scrollTo({
                                        left: index * itemWidth,
                                        behavior: 'smooth'
                                    });
                                }
                            }}
                        >
                            {item}
                        </div>
                    ))}
                    <div className="spinner-padder-horizontal" />
                </div>
            )}

            <div className="spinner-controls spinner-controls--right">
                <button
                    className="spinner-btn"
                    onClick={() => navigate(1)}
                    disabled={isStepActuallyDisabled(1)}
                >
                    <ArrowRight />
                </button>
                <button
                    className="spinner-btn"
                    onClick={() => navigate(fastStep)}
                    title={`Forward ${fastStep}`}
                    disabled={isStepActuallyDisabled(fastStep)}
                >
                    <DoubleArrowRight />
                </button>
            </div>
        </div>
    );
};

export { SpinnerWheel };

export default function Spinner({ onChange, initialDate, minDate, maxDate }) {
    const startDate = React.useMemo(() => {
        if (!initialDate) return new Date();
        const d = new Date(initialDate);
        return isNaN(d.getTime()) ? new Date() : d;
    }, [initialDate]);

    const [day, setDay] = useState(startDate.getDate());
    const [month, setMonth] = useState(months[startDate.getMonth()]);
    const [year, setYear] = useState(startDate.getFullYear());

    const getDaysInMonth = (m, y) => {
        const monthIndex = months.indexOf(m);
        return new Date(y, monthIndex + 1, 0).getDate();
    };

    const days = Array.from({ length: getDaysInMonth(month, year) }, (_, i) => i + 1);

    // Navigation handlers with overflow
    const handleDayOverflow = (direction, step) => {
        const currentMonthIndex = months.indexOf(month);
        const newDate = new Date(year, currentMonthIndex, day + step);
        updateDateIfAllowed(newDate);
    };

    const handleMonthOverflow = (direction, step) => {
        const currentMonthIndex = months.indexOf(month);
        const newDate = new Date(year, currentMonthIndex + step, day);
        updateDateIfAllowed(newDate);
    };

    const handleMonthChange = (newMonth) => {
        const monthIndex = months.indexOf(newMonth);
        const maxDayInTargetMonth = getDaysInMonth(newMonth, year);
        const targetDay = Math.min(day, maxDayInTargetMonth);
        const newDate = new Date(year, monthIndex, targetDay);
        updateDateIfAllowed(newDate);
    };

    const handleDayChange = (newDay) => {
        const monthIndex = months.indexOf(month);
        const newDate = new Date(year, monthIndex, newDay);
        updateDateIfAllowed(newDate);
    };

    const handleYearChange = (newYear) => {
        const monthIndex = months.indexOf(month);
        const maxDayInTargetMonth = getDaysInMonth(month, newYear);
        const targetDay = Math.min(day, maxDayInTargetMonth);
        const newDate = new Date(newYear, monthIndex, targetDay);
        updateDateIfAllowed(newDate);
    };

    const checkStepAllowed = (type, step) => {
        // Allow all steps for Month and Day to support cyclic wrapping
        if (type === 'month' || type === 'day') return true;

        let newDate;
        const currentMonthIndex = months.indexOf(month);

        if (type === 'year') {
            newDate = new Date(year + step, currentMonthIndex, day);
        }

        if (minDate && newDate < new Date(minDate)) return false;
        if (maxDate && newDate > new Date(maxDate)) return false;
        return true;
    };

    const updateDateIfAllowed = (newDate) => {
        const d_min = minDate ? new Date(minDate) : null;
        const d_max = maxDate ? new Date(maxDate) : null;
        const hasMin = d_min && !isNaN(d_min.getTime());
        const hasMax = d_max && !isNaN(d_max.getTime());

        let finalDate = newDate;

        if (hasMax && newDate > d_max) {
            // Wrap to start of allowed range
            finalDate = hasMin ? new Date(d_min) : new Date(displayYears[0], 0, 1);
        } else if (hasMin && newDate < d_min) {
            // Wrap to end of allowed range
            finalDate = hasMax ? new Date(d_max) : new Date(displayYears[displayYears.length - 1], 11, 31);
        }

        setDay(finalDate.getDate());
        setMonth(months[finalDate.getMonth()]);
        setYear(finalDate.getFullYear());
    };

    // Ensure day is valid when month changes (e.g. going from Mar 31 to Feb -> switch to Feb 28)
    useEffect(() => {
        const maxDay = getDaysInMonth(month, year);
        if (day > maxDay) {
            setDay(maxDay);
        }
    }, [month, year]);

    const onChangeRef = useRef(onChange);
    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    useEffect(() => {
        if (onChangeRef.current) {
            const monthIndex = months.indexOf(month);
            onChangeRef.current(new Date(year, monthIndex, day));
        }
    }, [day, month, year]);

    // Dynamic year range based on minDate/maxDate if available
    const displayYears = React.useMemo(() => {
        const start = minDate ? new Date(minDate).getFullYear() : currentYear - 5;
        const end = maxDate ? new Date(maxDate).getFullYear() : currentYear + 10;
        const length = end - start + 1;
        return Array.from({ length: Math.max(1, length) }, (_, i) => start + i);
    }, [minDate, maxDate]);

    return (
        <div className="spinner-container">
            <div className="spinner-highlight"></div>
            <SpinnerWheel
                items={months}
                selected={month}
                onChange={handleMonthChange}
                onOverflow={handleMonthOverflow}
                type="month"
                isStepDisabled={(step) => !checkStepAllowed('month', step)}
            />
            <SpinnerWheel
                items={days}
                selected={day}
                onChange={handleDayChange}
                onOverflow={handleDayOverflow}
                type="day"
                isStepDisabled={(step) => !checkStepAllowed('day', step)}
            />
            <SpinnerWheel
                items={displayYears}
                selected={year}
                onChange={handleYearChange}
                type="year"
                min={displayYears[0]}
                max={displayYears[displayYears.length - 1]}
                isStepDisabled={(step) => !checkStepAllowed('year', step)}
            />
        </div>
    );
}
