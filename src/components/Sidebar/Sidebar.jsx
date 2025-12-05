import React from 'react'
import './Sidebar.css'
import useStore from '../../store/useStore'

function Sidebar() {


    const user = useStore((state) => state.user)
    const history = user.history

    const today = new Date().toISOString().split('T')[0]

    const todayHistory = history.timeLine.get(today) || { tasksDone: 0, xp: 0, tasksUndone: 0 }

    return (
        <div className="sidebar">
            <h2 className="sidebar__title">Sidebar</h2>
            <div>
                <h3 className="sidebar__stats__title">Stats for today</h3>
                <div className="sidebar__today flex justify-between items-center">
                    <div className="sidebar__today__stats">
                        <div className="sidebar__today__stats__icon">
                            <svg width="60" height="60" viewBox="0 0 60 60">
                                <defs>
                                    <linearGradient id="rainbowGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                                        <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                <circle cx="30" cy="30" r="28" fill="url(#rainbowGradient1)" />
                                <path d="M 18 30 L 26 38 L 42 22" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h4 className="sidebar__stats__subtitle">Tasks completed</h4>
                        <p>{todayHistory.tasksDone}</p>
                    </div>
                    <div className="sidebar__today__stats">
                        <div className="sidebar__today__stats__icon">
                            <svg width="60" height="60" viewBox="0 0 60 60">
                                <defs>
                                    <linearGradient id="rainbowGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                                        <stop offset="50%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                <circle cx="30" cy="30" r="28" fill="url(#rainbowGradient2)" />
                                <path d="M 30 12 L 35 23 L 47 25 L 38 34 L 40 46 L 30 40 L 20 46 L 22 34 L 13 25 L 25 23 Z" fill="white" stroke="white" strokeWidth="1" />
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

                <div className="sidebar__chart">
                    <h3 className="sidebar__stats__title">Last 7 Days</h3>
                    <div className="sidebar__chart__container">
                        {[...Array(7)].map((_, i) => {
                            const d = new Date();
                            d.setDate(d.getDate() - (6 - i));
                            const dateStr = d.toISOString().split('T')[0];
                            const dayData = history.timeLine.get(dateStr) || { xp: 0 };
                            const height = Math.min(dayData.xp / 2, 100); // Scale: 200xp = 100% height

                            return (
                                <div key={i} className="sidebar__chart__bar-group">
                                    <div
                                        className="sidebar__chart__bar"
                                        style={{ height: `${height}%` }}
                                        title={`${dateStr}: ${dayData.xp} XP`}
                                    ></div>
                                    <span className="sidebar__chart__label">
                                        {d.toLocaleDateString('en-US', { weekday: 'narrow' })}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Sidebar