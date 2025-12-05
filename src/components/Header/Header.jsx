import React, { useState, useEffect } from 'react'
import clsx from 'clsx'


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
    const [xpChangeAnimation, setXpChangeAnimation] = useState(false);

    const handleXpChange = () => {
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

        if (levelChange === false && displayXp !== currentXp) {
            setXpChangeAnimation(false)
        }
    }

    useEffect(() => {

        if (displayLevel === level) {
            setLevelChange(false)
        }

        if (displayLevel < level) {
            setXpChangeAnimation('up')

            setLevelChange('up');
        }

        if (displayLevel > level) {
            setXpChangeAnimation('down')
            setLevelChange('down');
        }


    }, [level, displayLevel, levelChange]);


    const progressPercent = Math.floor(currentXp / xpToNextLevel * 100)

    const levelUpBlockClass = clsx(
        'header__xp__block header__xp__block--level',
        {
            'header__xp__block--level-up': xpChangeAnimation === 'up',
            'header__xp__block--level-down': xpChangeAnimation === 'down',
        }
    )

    const headerXpClass = clsx(
        'header__xp flex items-center',
        {
            'header__xp--level-up': xpChangeAnimation === 'up',
            'header__xp--level-down': xpChangeAnimation === 'down',
        }
    )


    return (
        <div className="header flex mt-xl items-center justify-evenly">
            <h1 className="header__title ">ZenTask</h1>
            <div>
                <ProgressBar
                    percent={progressPercent}
                    levelChange={levelChange}
                    displayLevel={displayLevel}
                    handleLevelChange={handleXpChange}

                />
            </div>
            <div className={headerXpClass}>
                <div className="header__xp__block">Level</div>
                <div className={levelUpBlockClass}>
                    {displayLevel}
                </div>
                <div className="header__xp__block">|</div>
                <div className="header__xp__block">{displayXp}</div>
                <div className="header__xp__block">/</div>
                <div className="header__xp__block">{displayXpToNextLevel}</div>
                <div className="header__xp__block">XP</div>
            </div>
            <button className="btn-logout header__logout">Logout</button>
            {import.meta.env.DEV && <button onClick={() => useStore.getState().resetStore()}>Reset</button>}
        </div>
    )
}

export default Header