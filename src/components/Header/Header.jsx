import React, { useState, useEffect } from 'react'

import './Header.css'
import useStore from '../../store/useStore';

import ProgressBar from './ProgressBar'

function Header() {
    const user = useStore((state) => state.user)
    const levelUpCache = useStore((state) => state.levelUpCache)

    const { level, currentXp, xpToNextLevel } = user

    const [displayLevel, setDisplayLevel] = useState(level);
    const [displayXp, setDisplayXp] = useState(currentXp);
    const [displayXpToNextLevel, setDisplayXpToNextLevel] = useState(xpToNextLevel);
    const [levelChange, setLevelChange] = useState(false);

    const handleLevelChange = () => {
        if (levelChange === 'up') {
            const newLevel = displayLevel + 1
            setDisplayLevel(prev => prev + 1)
            setDisplayXp(levelUpCache[newLevel - 1])
            setDisplayXpToNextLevel(levelUpCache[newLevel])
        }

        if (levelChange === 'down') {
            const newLevel = displayLevel - 1
            setDisplayLevel(prev => prev - 1)
            setDisplayXp(levelUpCache[newLevel])
            setDisplayXpToNextLevel(levelUpCache[newLevel])
        }

        if (levelChange === false) {
            setDisplayXp(currentXp)
            setDisplayXpToNextLevel(xpToNextLevel)
            setDisplayLevel(level)
            setLevelChange(false)
        }
    }

    useEffect(() => {

        if (displayLevel === level) {
            setLevelChange(false)
        }

        if (displayLevel < level) {
            setLevelChange('up');
        }

        if (displayLevel > level) {
            setLevelChange('down');
        }


    }, [level, displayLevel, levelChange]);


    const progressPercent = Math.floor(currentXp / xpToNextLevel * 100)

    return (
        <div className="header flex mt-xl items-center justify-evenly">
            <h1 className="header__title ">ZenTask</h1>
            <div>
                <ProgressBar
                    percent={progressPercent}
                    levelChange={levelChange}
                    displayLevel={displayLevel}
                    handleLevelChange={handleLevelChange}

                />
            </div>
            <p className="header__xp">Level {displayLevel} | {displayXp}/{displayXpToNextLevel}   XP</p>
            <button>Logout</button>
            {import.meta.env.DEV && <button onClick={() => useStore.getState().resetStore()}>Reset</button>}
        </div>
    )
}

export default Header