import React from 'react'
import clsx from 'clsx';

import { SpinnerWheel } from 'utils/Spinner/Spinner';
import './RegularTiming.css';


import useStore from 'store/useStore';

const intervals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function TimingChoiceButton({ period, children }) {

    const task = useStore(state => state.editingTask)

    const taskTimingType = task.timingType

    const setEditTaskTiming = useStore(state => state.setEditTaskTiming)

    let repeatEvery;

    switch (period) {
        case 'daily':
            repeatEvery = 1;
            break;
        case 'weekly':
            repeatEvery = new Date().getDay();
            break;
        case 'monthly':
            repeatEvery = new Date().getDate();
            break;
        case 'yearly':
            repeatEvery = new Date().getMonth() + " " + new Date().getDate();
            break;
    }

    const className = clsx(
        'btn-ghost btn-lg',
        taskTimingType === 'regular' && task.timing.period === period && 'regular-timing__btn-active'
    )
    const clickHandler = () => {
        setEditTaskTiming({
            ...task,
            timingType: 'regular',
            timing: {
                ...task.timing,
                period: period,
                repeatEvery: repeatEvery
            }
        })
    }


    return (
        <button className={className} onClick={clickHandler}>
            {children}
        </button>
    )
}

function RegularTiming() {
    const task = useStore(state => state.editingTask);
    const taskTimingType = task.timingType;
    const taskTimingPeriod = task.timing.period;

    const isCustom = taskTimingType === 'regular' && taskTimingPeriod === 'custom'

    const setEditTaskTiming = useStore(state => state.setEditTaskTiming)

    const [custom, setCustom] = React.useState(false)

    const customBtnClassName = clsx(
        'btn-ghost btn-lg',
        isCustom && 'regular-timing__btn-active'
    )

    return (
        <div className="regular-timing__container">
            <div className="regular-timing__section">
                <TimingChoiceButton period="daily">Daily</TimingChoiceButton>
                <TimingChoiceButton period="weekly">Weekly</TimingChoiceButton>
                <TimingChoiceButton period="monthly">Monthly</TimingChoiceButton>
                <TimingChoiceButton period="yearly">Yearly</TimingChoiceButton>
            </div>
            <div
                className={isCustom ?
                    'regular-timing__section regular-timing__section--active' : 'regular-timing__section'}
            >
                <h3>Repeat every</h3>
                <button className={customBtnClassName}
                    onClick={() =>
                        setEditTaskTiming({
                            ...task,
                            timingType: 'regular',
                            timing: {
                                ...task.timing,
                                period: 'custom',
                                repeatEvery: task.timing.every || 2
                            }
                        })
                    }>
                    Custom
                </button>
                <div
                    style={isCustom ? { opacity: 1 } : { opacity: 0.3 }}
                >

                    {isCustom && <SpinnerWheel
                        items={intervals}
                        selected={task.timing.every || 2}
                        onChange={(value) =>
                            setEditTaskTiming({
                                ...task,
                                timing: {
                                    ...task.timing,
                                    every: value
                                }
                            })
                        }
                    />}
                </div>
            </div>
        </div>
    )
}

export default RegularTiming