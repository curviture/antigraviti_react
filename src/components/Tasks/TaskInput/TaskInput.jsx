import { useState } from 'react'
import './TaskInput.css'
import useStore from '../../../store/useStore'

import Timing from './Timing/Timing'

function TaskInput() {

    const submitTask = useStore((state) => state.submitTask)
    const editingTask = useStore((state) => state.editingTask)
    const setEditingTask = useStore((state) => state.setEditingTask)

    const [timingOn, setTimingOn] = useState(false);
    const [title, setTitle] = useState('');
    const [xp, setXp] = useState(null);

    const handleSubmit = () => {
        if (!editingTask.title || editingTask.title.trim() === '') return

        // Ensure XP is a valid positive number
        if (editingTask.xp < 0) {
            setEditingTask({ xp: 0 })
        }

        submitTask()
        // editingTask is reset by the store, but we might want to close timing or keep it open?
        // User logic had reset timing state in setTask previously.
        // Store reset handles the data. We just keep timingOn as is or reset it?
        // User had: setTask({ timingType: 'daily', ... }) which is now done in store reset.
    }

    return (
        <div className="task-input">
            <div className="task-input__form flex justify-evenly items-center">
                <div className="task-input__group">
                    <label htmlFor="task-title" className="task-input__label">Task</label>
                    <input
                        id="task-title"
                        type="text"
                        className="task-input__field"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='What needs to be done?'
                    />
                </div>
                <div className="task-input__group">
                    <label htmlFor="task-xp" className="task-input__label">XP Reward</label>
                    <input
                        id="task-xp"
                        type="number"
                        className="task-input__field task-input__field--xp"
                        value={xp || ''}
                        onChange={(e) => setXp(Number(e.target.value))}
                        placeholder='10'
                    />
                </div>
                <div className="task-input__group">
                    <label htmlFor="task-timing" className="task-input__label">Timing</label>
                    <button
                        className="btn-primary task-input_timing--button"
                        onClick={() => setTimingOn(!timingOn)}>
                        Timing
                    </button>
                </div>
                <div className="task-input__group task-input__group--timing">
                    {timingOn && <Timing />}
                </div>
                <div className="task-input__button-container mt-xl">
                    <button className="btn-primary btn-lg" onClick={handleSubmit}>
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskInput