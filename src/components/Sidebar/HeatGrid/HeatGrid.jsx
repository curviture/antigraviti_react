import React from 'react'
import './HeatGrid.css'

import useStore from '../../../store/useStore'

function HeatGrid() {

    const history = useStore((state) => state.user.history)
    const timeLine = history.timeLine

    const currentMonth = new Date().getMonth()

    const lengthOfCurrentMonth = new Date(new Date().getFullYear(), currentMonth + 1, 0).getDate()

    const startOfCurrentMonth = new Date(new Date().getFullYear(), currentMonth, 1).getDay()
    const endOfCurrentMonth = new Date(new Date().getFullYear(), currentMonth + 1, 0).getDay();

    const daysInMonth = new Array(lengthOfCurrentMonth).fill(0).map((_, index) => index + 1)

    const grid = new Array(startOfCurrentMonth).fill(null)
        .concat(daysInMonth)
        .concat(new Array(6 - endOfCurrentMonth).fill(null))

    const heatGrid = grid.map((day) => {
        if (day === null) {
            return <div className="heatgrid__item"></div>
        }

        if (day !== null) {

            const date = new Date(new Date().getFullYear(), currentMonth, day).toISOString().split('T')[0]

            if (!timeLine.get(date)) {
                return <div className="heatgrid__item heatgrid__item--empty"></div>
            } else {
                const xp = timeLine.get(date).xp

                if (xp < 70) {
                    return <div className="heatgrid__item heatgrid__item--low"></div>
                }

                if (xp >= 70 && xp < 140) {
                    return <div className="heatgrid__item heatgrid__item--medium"></div>
                }

                if (xp >= 140) {
                    return <div className="heatgrid__item heatgrid__item--high"></div>
                }
            }
        }
    })

    console.log(heatGrid)

    return (
        <div className="heatgrid">
            {heatGrid}
        </div>
    )
}

export default HeatGrid