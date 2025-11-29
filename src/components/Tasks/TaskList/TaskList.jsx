import React from 'react'

import useStore from '../../../store/useStore'

import TaskItem from './TaskItem'

function TaskList() {

    const tasks = useStore((state) => state.tasks)

    console.log(tasks)

    return (
        <div>
            <h3>TaskList</h3>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <TaskItem task={task} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TaskList