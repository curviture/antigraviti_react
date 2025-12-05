import React, { useState, useEffect } from 'react'
import { useAnimate } from 'motion/react'

import './Header.css';

const animationConfigLevelChange = {
    duration: 2,
    ease: 'linear',
    delay: 0.15
}

function ProgressBar({ percent, displayLevel, levelChange, handleLevelChange }) {
    const [previousPercent, setPreviousPercent] = useState(percent)
    const [scope, animate] = useAnimate()

    useEffect(() => {
        if (levelChange === false) {
            const animateSequence = async () => {

                await animate(scope.current,
                    {
                        width: `${percent}%`
                    },
                    {
                        duration: 1.75,
                        ease: 'linear',
                        delay: 0.15
                    })

                setPreviousPercent(percent)
                handleLevelChange()
            }

            animateSequence()

        }

        if (levelChange === 'up') {
            const animateSequence = async () => {

                await animate(scope.current,
                    {
                        width: '100%'
                    },
                    animationConfigLevelChange
                )


                await animate(scope.current,
                    {
                        width: '0%'
                    },
                    {
                        duration: 0,
                        ease: 'linear',
                        delay: 0.25
                    })

                setPreviousPercent(0)
                handleLevelChange()
            }

            animateSequence()
        }

        if (levelChange === 'down') {
            const animateSequence = async () => {

                await animate(scope.current,
                    {
                        width: '0%'
                    },
                    animationConfigLevelChange)

                await animate(scope.current,
                    {
                        width: '100%'
                    },
                    {
                        duration: 0,
                        ease: 'linear',
                        delay: 0.25
                    }
                )

                setPreviousPercent(100)
                handleLevelChange()
            }

            animateSequence()
        }

    }, [percent, animate, displayLevel, levelChange])

    return (
        <div className="progress-bar">
            <div
                ref={scope}
                className={`progress-bar__fill`}
                // initial={{ width: `${previousPercent}%` }}
                style={{ width: `${previousPercent}%` }}
            />
        </div>
    )
}

export default ProgressBar