import React from 'react'

import './Header.css'

function ProgressBar(props) {

    const { percent, transitionHandler } = props



    return (
        <div className="progress-bar">
            <div className="progress-bar__fill"
                onTransitionEnd={transitionHandler}
                style={{ width: `${percent}%` }}>
            </div>
        </div>
    )
}

export default ProgressBar