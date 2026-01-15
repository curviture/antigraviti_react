import React, { useState } from 'react'
import clsx from 'clsx';

import { motion } from 'motion/react'

import RegularTiming from './RegularTiming/RegularTiming'
import NonRegularTiming from './NonRegularTiming/NonRegularTiming'
import AsDateTiming from './AsDateTiming/AsDateTiming'

import useStore from '../../../../store/useStore'

import './Timing.css'

function TimingTypeButton({ type, children }) {

    const setTimingType = useStore((state) => state.setEditTaskTimingType);
    const timingType = useStore((state) => state.editingTask.timingType);

    const className = clsx(
        'btn-ghost btn-lg',
        timingType === type && 'regular-timing__btn-active'
    )

    return (
        <button
            className={className}
            onClick={() => setTimingType(type)}
        >
            {children}
        </button>
    )
}


function Timing() {

    const timingType = useStore((state) => state.editingTask.timingType);

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
                <div className="timing-selector flex">
                    <h3 className="task_timing_desc">Daily/Weekly/Monthly/Yearly</h3>
                    <TimingTypeButton type="regular">Regular</TimingTypeButton>
                    <h3 className="task_timing_desc">Not Regular, with range</h3>
                    <TimingTypeButton type="not_regular">Not Regular</TimingTypeButton>
                    <h3 className="task_timing_desc">As Date</h3>
                    <TimingTypeButton type="as_date">As Date</TimingTypeButton>
                </div>

                {timingType === 'regular' && (
                    <RegularTiming />
                )}
                {timingType === 'not_regular' && (
                    <NonRegularTiming />
                )}
                {timingType === 'as_date' && (
                    <AsDateTiming />
                )}
            </div>
        </motion.div>
    )
}

export default Timing