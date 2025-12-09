import React, { useRef, useEffect, useState } from 'react';
import './Spinner.css';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 11 }, (_, i) => currentYear + i); // Current year + 10 years

const SpinnerWheel = ({ items, selected, onChange, type }) => {
    const rootRef = useRef(null);
    const itemWidth = 100; // Must match CSS

    // Determine fast step based on type
    let fastStep = 5;
    if (type === 'month') fastStep = 3;
    if (type === 'year') fastStep = 2;

    // Initial scroll to selected item
    useEffect(() => {
        if (rootRef.current) {
            const index = items.indexOf(selected);
            if (index !== -1) {
                rootRef.current.scrollLeft = index * itemWidth;
            }
        }
    }, [items, selected]);

    const handleScroll = (e) => {
        const scrollLeft = e.target.scrollLeft;
        const index = Math.round(scrollLeft / itemWidth);

        if (items[index] !== undefined && items[index] !== selected) {
            onChange(items[index]);
        }
    };

    const navigate = (step) => {
        const currentIndex = items.indexOf(selected);
        if (currentIndex === -1) return;

        let newIndex = currentIndex + step;

        // Clamp logic
        if (newIndex < 0) newIndex = 0;
        if (newIndex >= items.length) newIndex = items.length - 1;

        onChange(items[newIndex]);
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

    return (
        <div className="spinner-row">
            <div className="spinner-controls spinner-controls--left">
                <button className="spinner-btn" onClick={() => navigate(-fastStep)} title={`Back ${fastStep}`}><DoubleArrowLeft /></button>
                <button className="spinner-btn" onClick={() => navigate(-1)}><ArrowLeft /></button>
            </div>

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

            <div className="spinner-controls spinner-controls--right">
                <button className="spinner-btn" onClick={() => navigate(1)}><ArrowRight /></button>
                <button className="spinner-btn" onClick={() => navigate(fastStep)} title={`Forward ${fastStep}`}><DoubleArrowRight /></button>
            </div>
        </div>
    );
};

export default function Spinner({ onChange }) {
    const [day, setDay] = useState(new Date().getDate());
    const [month, setMonth] = useState(months[new Date().getMonth()]);
    const [year, setYear] = useState(new Date().getFullYear());

    const getDaysInMonth = (m, y) => {
        const monthIndex = months.indexOf(m);
        return new Date(y, monthIndex + 1, 0).getDate();
    };

    const days = Array.from({ length: getDaysInMonth(month, year) }, (_, i) => i + 1);

    // Ensure day is valid when month changes (e.g. going from Mar 31 to Feb -> switch to Feb 28)
    useEffect(() => {
        const maxDay = getDaysInMonth(month, year);
        if (day > maxDay) {
            setDay(maxDay);
        }
    }, [month, year]);

    useEffect(() => {
        if (onChange) {
            // Format date for parent
            const monthIndex = months.indexOf(month);
            // Construct a date object or string
            onChange(new Date(year, monthIndex, day));
        }
    }, [day, month, year, onChange]);

    return (
        <div className="spinner-container">
            <div className="spinner-highlight"></div>
            <SpinnerWheel items={months} selected={month} onChange={setMonth} type="month" />
            <SpinnerWheel items={days} selected={day} onChange={setDay} type="day" />
            <SpinnerWheel items={years} selected={year} onChange={setYear} type="year" />
        </div>
    );
}
