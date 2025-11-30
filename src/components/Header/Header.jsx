import React, { useEffect, useState } from 'react'

import './Header.css'
import useStore from '../../store/useStore';

import ProgressBar from './ProgressBar'

function Header() {
    const user = useStore((state) => state.user)
    const { level, currentXp, xpToNextLevel } = user

    const [localLevel, setLocalLevel] = useState(level)
    const [localProgress, setLocalProgress] = useState(0)

    const onProgressTransitionEnd = () => {
        if (level > localLevel) {
            setLocalLevel(prev => prev + 1)
            setLocalProgress(0)
        }

        if (level < localLevel) {
            setLocalLevel(prev => prev - 1)
            setLocalProgress(100)
        }
    };

    useEffect(() => {
        if (level > localLevel) {
            setLocalProgress(100);
        }

        if (level < localLevel) {
            setLocalProgress(0);
        }

        if (level === localLevel) {
            setLocalProgress(Math.floor(currentXp / xpToNextLevel) * 100)
        }

    }, [level, localLevel]);

    return (
        <div className="header flex mt-xl items-center justify-evenly">
            <h1 className="header__title ">ZenTask</h1>
            <div>
                <ProgressBar
                    percent={localProgress}
                    transitionEndHandler={onProgressTransitionEnd}
                />
            </div>
            <p>Level {level} | {currentXp}/{xpToNextLevel}   XP</p>
            <button>Logout</button>
        </div>
    )
}

export default Header