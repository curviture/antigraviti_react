import React from 'react'

import TaskInput from './TaskInput/TaskInput'
import TaskList from './TaskList/TaskList'

function Tasks() {
    return (
        <div>
            <h3>Tasks</h3>
            <div className="mb-xl">
                <TaskList />
            </div>
            <div className="mb-xl">
                <TaskInput />
            </div>
        </div>
    )
}

export default Tasks