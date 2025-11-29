import React from 'react';
import './TaskItem.css';
import useStore from '../../../store/useStore';

function TaskItem({ task }) {
    const toggleTask = useStore((state) => state.toggleTask);
    const deleteTask = useStore((state) => state.deleteTask);

    const handleToggle = () => {
        toggleTask(task.id);
    };

    const handleDelete = () => {
        deleteTask(task.id);
    };

    return (
        <div className={`task-item ${task.isCompleted ? 'task-item--completed' : ''}`}>
            <h4 className='task-item__title'>{task.title}</h4>
            <span className='task-item__xp'>{task.xp ? task.xp : 'No XP'}</span>
            <button className='task-item__toggle' onClick={handleToggle}>Toggle</button>
            <button className='task-item__delete' onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default TaskItem;
