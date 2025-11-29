import React from 'react'

import './Header.css'

function ProgressBar(props) {



    return (
        <div className="progress-bar">
            <div className="progress-bar__fill"
                style={{ width: `${props.percent}%` }}>
            </div>
        </div>
    )
}

export default ProgressBar