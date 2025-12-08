import React from 'react'

import './Tasks.css'

import TaskInput from './TaskInput/TaskInput'
import TaskList from './TaskList/TaskList'

function Tasks() {
    return (
        <div className="tasks">
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