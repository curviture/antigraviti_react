import React, { useRef, useState, useEffect } from 'react'
import './Sidebar.css'
import useStore from '../../store/useStore'
import Chart from './Chart/Chart'

function Sidebar() {


    const user = useStore((state) => state.user)
    const history = user.history

    const today = new Date().toISOString().split('T')[0]

    // console.log('history.timeLine', history.timeLine)

    const todayHistory = history.timeLine && history.timeLine.get(today) || { tasksDone: 0, xp: 0, tasksUndone: 0 }

    return (
        <div className="sidebar">
            <h2 className="sidebar__title">Sidebar</h2>
            <div>
                <h3 className="sidebar__stats__title">Stats for today</h3>
                <div className="sidebar__today flex justify-between items-center">
                    <div className="sidebar__today__stats">
                        <div className="sidebar__today__stats__icon">
                            <svg width="40" height="40" viewBox="0 0 40 40">
                                <defs>
                                    <linearGradient id="rainbowGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                                        <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                <circle cx="20" cy="20" r="19" fill="url(#rainbowGradient1)" />
                                <path d="M 12 20 L 18 26 L 28 14" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h4 className="sidebar__stats__subtitle">Tasks completed</h4>
                        <p>{todayHistory.tasksDone}</p>
                    </div>
                    <div className="sidebar__today__stats">
                        <div className="sidebar__today__stats__icon">
                            <svg width="40" height="40" viewBox="0 0 40 40">
                                <defs>
                                    <linearGradient id="rainbowGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                                        <stop offset="50%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                <circle cx="20" cy="20" r="19" fill="url(#rainbowGradient2)" />
                                {/* Scaled down path for lightning/star approx */}
                                <path d="M 20 8 L 23 15 L 31 16 L 25 22 L 27 30 L 20 26 L 13 30 L 15 22 L 9 16 L 17 15 Z" fill="white" stroke="white" strokeWidth="1" />
                            </svg>
                        </div>
                        <h4 className="sidebar__stats__subtitle">XP earned</h4>
                        <p>{todayHistory.xp}</p>
                    </div>
                </div>

                <div className="sidebar__streak">
                    <h3 className="sidebar__stats__title">Streak</h3>
                    <div className="sidebar__streak__card">
                        <div className="sidebar__streak__icon">🔥</div>
                        <div className="sidebar__streak__info">
                            <h4>{user.streak} Day Streak</h4>
                            <p>Keep it up!</p>
                        </div>
                    </div>
                </div>

                <Chart history={history} />
            </div>
        </div>
    )
}

export default Sidebar