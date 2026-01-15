import React, { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'

import './Calendar.css'

import CustomSelect from '../CustomSelect/CustomSelect'

const months = [['Jan', 'January'], ['Feb', 'February'], ['Mar', 'March'], ['Apr', 'April'], ['May', 'May'], ['Jun', 'June'], ['Jul', 'July'], ['Aug', 'August'], ['Sep', 'September'], ['Oct', 'October'], ['Nov', 'November'], ['Dec', 'December']]

const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function Calendar({ onChange, selectedDate }) {

    const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()][0])
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [selectedDay, setSelectedDay] = useState(null)

    const handleReset = () => {
        const now = new Date()
        setSelectedMonth(months[now.getMonth()][0])
        setSelectedYear(now.getFullYear())
    }

    const handleDayClick = (day) => {
        const date = new Date(selectedYear, months.findIndex(month => month[0] === selectedMonth), day)
        // onChange(date)
        setSelectedDay({ month: selectedMonth, year: selectedYear, day })
    }

    const years = useMemo(() => {
        const currentYear = new Date().getFullYear()
        const yearsArr = []
        for (let i = currentYear; i <= currentYear + 10; i++) {
            yearsArr.push(i)
        }
        return yearsArr
    }, [])

    const monthIndex = months.findIndex(month => month[0] === selectedMonth)
    const monthName = months[monthIndex][1]

    const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate()
    const firstDay = new Date(selectedYear, monthIndex, 1).getDay()

    const fillerDays = Array.from(
        {
            length: firstDay
        },
        (_, i) =>
            <div key={'start' + i} className="calendar__day calendar__day--filler" />
    )

    const days = Array.from(
        {
            length: daysInMonth
        },
        (_, i) => {

            const isSelected = selectedDay &&
                selectedDay.day === i + 1 &&
                selectedDay.month === selectedMonth &&
                selectedDay.year === selectedYear;

            const classOfDay = clsx('calendar__day', {
                'calendar__day--selected': isSelected
            })

            return <div key={'day' + i} className={classOfDay}>
                {i + 1}
            </div>
        }
    )

    const daysInMonthArray = [...fillerDays, ...days]

    const handleCalendarChange = (type) => {
        if (type === 'prev') {
            if (monthIndex === 0) {
                setSelectedYear(selectedYear - 1)
                setSelectedMonth(months[11][0])
            } else {
                setSelectedMonth(months[monthIndex - 1][0])
            }
        }

        if (type === 'next') {
            if (monthIndex === 11) {
                setSelectedYear(selectedYear + 1)
                setSelectedMonth(months[0][0])
            } else {
                setSelectedMonth(months[monthIndex + 1][0])
            }
        }
    }

    return (
        <div className="calendar">
            <div className="calendar__header">
                <button
                    onClick={() => handleCalendarChange('prev')}
                    className="calendar__header__button"
                >Back</button>
                <div className="calendar__header__date-container calendar__header__date-container--month">
                    <CustomSelect options={months.map(month => month[0])} selected={selectedMonth} onChange={setSelectedMonth} />
                </div>
                <button className="calendar__header__reset" onClick={handleReset} title="Current Month/Year">
                    <div className="calendar__header__reset-icon" />
                </button>
                <div className="calendar__header__date-container calendar__header__date-container--year">
                    <CustomSelect options={years} selected={selectedYear} onChange={setSelectedYear} />
                </div>
                <button
                    onClick={() => handleCalendarChange('next')}
                    className="calendar__header__button"
                >Next</button>
            </div>
            <div className="calendar__weekDays">
                {daysInWeek.map((day, index) => (
                    <div key={index} className="calendar__day calendar__day--header">
                        {day}
                    </div>
                ))}
            </div>
            <div className="calendar__body" onClick={(e) => {

                console.log(e.target)

                if (e.target.classList.contains('calendar__day')) {
                    handleDayClick(e.target.textContent)
                }
            }}>
                {daysInMonthArray}
            </div>
        </div>
    )
}

export default Calendar