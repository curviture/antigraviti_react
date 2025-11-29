import { useState } from 'react'
import './TaskInput.css'
import useStore from '../../../store/useStore'

function TaskInput() {

    const addTask = useStore((state) => state.addTask)
    const [title, setTitle] = useState('')
    const [xp, setXp] = useState(0)

    const addTaskHandler = () => {

        if (title.trim() === '') return
        let inputXp = Math.max(0, Number(xp))

        addTask({
            title,
            xp: inputXp,
        })
        setTitle('')
        setXp(0)
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
                        value={xp}
                        onChange={(e) => setXp(e.target.value)}
                        placeholder='10'
                    />
                </div>
                <div className="task-input__button-container">
                    <button className="btn-primary" onClick={addTaskHandler}>
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskInput