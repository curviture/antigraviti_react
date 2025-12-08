import React, { useRef, useState, useEffect } from 'react'
import './Chart.css'

import { motion } from 'motion/react'

function Chart({ history }) {
    const [chartHeight, setChartHeight] = useState(0)
    const chartRef = useRef(null)

    useEffect(() => {
        if (chartRef.current) {
            const style = getComputedStyle(chartRef.current)
            let height = parseFloat(style.height)

            // If CSS doesn't define height, set it on the element
            if (!height || height === 0 || isNaN(height)) {
                height = 120 // Default height
                chartRef.current.style.height = `${height}px` // Actually set it on the DOM element
                console.warn('Chart container has no CSS height set, applying default:', height)
            }

            height = parseFloat(style.height) - 30

            const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
            const finalHeight = height - padding - 30
            // console.log('Final Chart Height:', finalHeight)
            setChartHeight(Math.max(finalHeight, 50)) // Ensure minimum viable height
        }
    }, [])

    return (
        <div className="chart">
            <h3 className="sidebar__stats__title">Last 7 Days</h3>
            <div className="chart__container" ref={chartRef}>
                {(() => {
                    const last7Days = [...Array(7)].map((_, i) => {
                        const d = new Date();
                        d.setDate(d.getDate() - (6 - i));
                        const dateStr = d.toISOString().split('T')[0];
                        const dayData = history.timeLine.get(dateStr) || { xp: 0 };
                        return { date: d, dateStr, xp: dayData.xp };
                    });

                    const maxXP = Math.max(...last7Days.map(d => d.xp), 10); // Minimum scale of 10 to avoid division by zero or huge bars for 1xp

                    return last7Days.map((day, i) => {
                        const height = chartHeight ? (day.xp / maxXP) * chartHeight : 0;

                        return (
                            <div key={i} className="chart__bar-group">
                                <motion.div
                                    className="chart__bar"
                                    style={{ height: `${height}px` }}
                                    title={`${day.dateStr}: ${day.xp} XP`}
                                    initial={{ height: 0 }}
                                    animate={{ height }}
                                    transition={{ duration: 0.5, delay: 2 + i * 0.2 }}
                                ></motion.div>
                                <span className="chart__label">
                                    {day.date.toLocaleDateString('en-US', { weekday: 'narrow' })}
                                </span>
                            </div>
                        );
                    });
                })()}
            </div>
        </div>
    )
}

export default Chart
