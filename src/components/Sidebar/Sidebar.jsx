import React, { useRef, useState, useEffect } from 'react'
import './Sidebar.css'
import useStore from '../../store/useStore'


import Chart from './Chart/Chart'
import HeatGrid from './HeatGrid/HeatGrid'
import SvgIcons from './SvgIcons'



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
                            <SvgIcons.CheckMarkIcon />
                        </div>
                        <h4 className="sidebar__stats__subtitle">Tasks completed</h4>
                        <p>{todayHistory.tasksDone}</p>
                    </div>
                    <div className="sidebar__today__stats">
                        <div className="sidebar__today__stats__icon">
                            <SvgIcons.StarIcon />
                        </div>
                        <h4 className="sidebar__stats__subtitle">XP earned</h4>
                        <p>{todayHistory.xp}</p>
                    </div>
                </div>
            </div>

            <div className="sidebar__streak">
                <h3 className="sidebar__stats__title">Streak</h3>
                <div className="sidebar__streak_content">
                    <div className="sidebar__streak__card">
                        <div className="sidebar__streak__icon">🔥</div>
                        <div className="sidebar__streak__info">
                            <h4>{user.streak} Day Streak</h4>
                            <p>Keep it up!</p>
                        </div>
                    </div>
                    <div className="sidebar__streak__heatgrid">
                        <HeatGrid />
                    </div>
                </div>
            </div>

            <Chart history={history} />
        </div>
    )
}

export default Sidebar