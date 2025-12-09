import React, { useState } from 'react'
import { motion } from 'motion/react'
import Spinner from './Spinner.jsx'


import './Timing.css'


function Timing() {
    const [timingType, setTimingType] = useState('regular'); // 'regular' or 'not_regular'

    return (
        <motion.div className="task-input__group"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
        >
            <div className="task-timing__title">
                <h2>Timing</h2>
            </div>
            <div className="task-timing__inputs">
                <div className="task-timing__select-group">
                    <select
                        className="task-timing__select"
                        value={timingType}
                        onChange={(e) => setTimingType(e.target.value)}
                    >
                        <option value="regular">Regular</option>
                        <option value="not_regular">Not Regular</option>
                    </select>
                </div>

                {timingType === 'regular' && (
                    <div className="task-timing__select-group">
                        <select className="task-timing__select">
                            <option value="">Select</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                )}

                {timingType === 'not_regular' && (
                    <div className="task-timing__spinner-wrapper" style={{ width: '100%', marginTop: '1rem' }}>
                        <Spinner onChange={(date) => console.log('Selected Date:', date)} />
                        {/* Placeholder for future 'second spinner' logic */}
                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            <button className="btn-text" style={{ fontSize: '0.8rem', opacity: 0.7 }}>+ Range</button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default Timing