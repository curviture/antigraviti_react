import React, { useState } from 'react'
import DateInput from 'utils/DateInput/DateInput'
import './NonRegularTiming.css'
import './TaskRangeLine.css'

import Calendar from 'utils/Calendar/Calendar'

import useStore from 'store/useStore'

function Range({ range, removeRangeHandler, editRangeHandler }) {
    return (
        <div className="non-regular-timing-range">
            {range.startDate.toLocaleDateString()} - {range.endDate.toLocaleDateString()}
            <button
                className="btn-ghost btn-lg"
                onClick={() => editRangeHandler(range.id)}
            >Edit</button>
            <button
                className="btn-ghost btn-lg"
                onClick={() => removeRangeHandler(range.id)}
            >Delete</button>
        </div>
    )
}

function TaskRangeLine({ range }) {

    const length = new Date(range.endDate) - new Date(range.startDate)
    const days = Math.floor(length / (1000 * 60 * 60 * 24))

    let outPut;

    switch (true) {
        case days <= 5:
            outPut = <div>
                {range.startDate.toLocaleDateString() - range.endDate.toLocaleDateString()}
            </div>
            break;
        case days < 28 && days > 5:
            outPut = Array(days).fill(0).map((_, index) =>
                <div
                    className="timing-range-line-day"
                    key={index}
                >
                </div>)
            break;
        case days > 28 && days < 256:
            outPut =
                Array(Math.ceil(days / 7)).fill(0).map((_, index) =>
                    <div
                        className="timing-range-line-week"
                        key={index}
                    >
                    </div>)
            break;
        case days > 256:
            outPut = <div>
                {new Array(Math.ceil(days / 30)).fill(0).map((_, index) =>
                    <div
                        className="timing-range-line-month"
                        key={index}
                    >
                    </div>)}
            </div>
            break;
    }

    return (
        <div className="timing-range-line">
            {outPut}
        </div>
    )
}

function RangeEdit({ range, editRangeHandler }) {
    const [exception, setException] = useState(false)
    const [exceptionByDay, setExceptionByDay] = useState(true)

    const [startDate, setStartDate] = useState(range.startDate)
    const [endDate, setEndDate] = useState(range.endDate)

    return (
        <div>
            <div>
                <TaskRangeLine range={range} />
            </div>
            <button>Save</button>
            <button
                onClick={() => editRangeHandler(null)}
            >Cancel</button>
            {exception && <div>
                <h3>Managing Exception</h3>

                {exceptionByDay &&
                    <div>
                        <DateInput
                            initialDate={range.startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                    </div>
                }

                {!exceptionByDay &&
                    <div>
                        <DateInput
                            initialDate={range.startDate}
                            onChange={(date) => setStartDate(date)}
                            maxDate={endDate}
                        />
                        <DateInput
                            initialDate={range.endDate}
                            onChange={(date) => setEndDate(date)}
                            minDate={startDate}
                        />
                    </div>
                }

                <button
                    onClick={() => setExceptionByDay(true)}
                >
                    By Day
                </button>
                <button
                    onClick={() => setExceptionByDay(false)}
                >
                    By Range
                </button>
            </div>}
            <button
                onClick={() => setException(true)}
            >Add Exception</button>
        </div>
    )
}


function NonRegularTiming() {
    const { task } = useStore()

    const setEditTaskTiming = useStore((state) => state.setEditTaskTiming);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [ranges, setRanges] = useState([]);
    const [isEdit, setIsEdit] = useState(false)

    const addRangeHandler = () => {
        if (!startDate || !endDate) return
        setRanges([...ranges, { startDate, endDate, id: Date.now() }])
        setStartDate(new Date())
        setEndDate(new Date())
    }

    const removeRangeHandler = (id) => {
        setRanges(ranges.filter(range => range.id !== id))
    }

    const editRangeHandler = (id) => {
        setIsEdit(id)
    }

    return (
        <div
            className="non-regular-timing__container"
        // style={{ width: '100%', marginTop: '1rem' }}
        >
            <div className='non-regular-timing__ranges'>
                {ranges.map(range => (
                    <Range
                        key={range.id}
                        range={range}
                        removeRangeHandler={removeRangeHandler}
                        editRangeHandler={editRangeHandler}
                    />
                ))}
            </div>
            <h3>Start of Range</h3>
            {!isEdit &&
                <div style={{ width: '100%' }}>
                    <div className="non-regular-timing__range-inputs">
                        <Calendar />
                    </div>
                    <div className='non-regular-timing__controls'>
                        <div className="non-regular-timing__actions">
                            <h3>Submit Range</h3>
                            <button
                                className="btn-ghost btn-lg"
                                onClick={addRangeHandler}
                            >
                                + Add Range
                            </button>
                        </div>
                        <div className="non-regular-timing__actions">
                            <button className="btn-ghost btn-lg">+ Exception</button>
                        </div>
                    </div>
                </div>
            }
            {isEdit &&
                <RangeEdit
                    range={ranges.find(range => range.id === isEdit)}
                    editRangeHandler={editRangeHandler}
                />
            }
            {/* Placeholder for future 'second spinner' logic */}
        </div>
    )
}

export default NonRegularTiming