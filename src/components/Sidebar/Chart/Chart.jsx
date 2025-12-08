import React, { useRef, useState, useEffect, useMemo } from 'react'
import './Chart.css'
import clsx from 'clsx'
import { motion } from 'motion/react'

function Chart({ history }) {
    const [chartHeight, setChartHeight] = useState(0)
    const [chartMaxXP, setChartMaxXP] = useState(0)
    const chartRef = useRef(null);

    const chartBars = useMemo(() => {
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            const dateStr = d.toISOString().split('T')[0];
            const dayData = history.timeLine.get(dateStr) || { xp: 0 };
            return { date: d, dateStr, xp: dayData.xp };
        });



        return last7Days
    }, [history])

    const maxXP = useMemo(() => Math.max(...chartBars.map(d => d.xp), 10), [chartBars]);

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
                <div className="chart__scale">
                    <div className="chart__scale__bar">{Math.round(maxXP)}</div>
                    <div className="chart__scale__bar">{Math.round(maxXP * 0.75)}</div>
                    <div className="chart__scale__bar">{Math.round(maxXP * 0.5)}</div>
                    <div className="chart__scale__bar">{Math.round(maxXP * 0.25)}</div>
                    <div className="chart__scale__bar">0</div>
                </div>
                <div className="chart__bars">
                    {chartBars.map((day, i) => {
                        const height = chartHeight ? (day.xp / maxXP) * chartHeight : 0;

                        const isMax = day.xp === maxXP && day.xp > 0;

                        return (
                            <div key={i} className={clsx("chart__bar-group", { "chart__bar-group--max": isMax })}>
                                {isMax && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 3 + i * 0.2, duration: 0.3, type: "spring" }}
                                        className="chart__star"
                                    >
                                        ⭐
                                    </motion.div>
                                )}
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
                    })}
                </div>

            </div>
        </div>
    )
}

export default Chart
