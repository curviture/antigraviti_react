import React from 'react'

import './Header.css'
import useStore from '../../store/useStore';

import ProgressBar from './ProgressBar'

function Header() {
    const user = useStore((state) => state.user)

    const { level, currentXp, xpToNextLevel } = user

    const progressPercent = Math.floor(currentXp / xpToNextLevel * 100)
    console.log('Progress:', progressPercent, '%', { currentXp, xpToNextLevel })

    return (
        <div className="header flex mt-xl items-center justify-evenly">
            <h1 className="header__title ">ZenTask</h1>
            <div>
                <ProgressBar percent={progressPercent} />
            </div>
            <p>Level {level} | {currentXp}/{xpToNextLevel}   XP</p>
            <button>Logout</button>
        </div>
    )
}

export default Header