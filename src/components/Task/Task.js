import './Task.css'
import { TbTrash } from 'react-icons/tb';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FiEdit3 } from 'react-icons/fi';
import { VscSaveAs } from 'react-icons/vsc'
import { useState } from 'react';

export function Task({ 
    task, 
    onComplete, 
    onDelete, 
    tasks, 
    setTasksAndSave
}) {
    const [taskEditing, setTaskEditing] = useState(null);
    const [titleEditing, setTitleEditing] = useState('');

    const onEdit = (id) => {
        const updatedTasks = [...tasks].map((task) => {
            if (task.id === id) {
                task.title = titleEditing
            }
            return task;
        })

        setTasksAndSave(updatedTasks);
        setTaskEditing(null);
        setTitleEditing('');
    }

    return (
        <>
            <div className="task">
                <button className="checkContainer" onClick={() => onComplete(task.id)}>
                    {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
                </button>

                {
                    taskEditing === task.id && !task.isCompleted
                    ? (
                        <input 
                            type="text"
                            onChange={(event) => setTitleEditing(event.target.value)}
                            value={titleEditing}
                            className="editTask"
                        >
                        </input>
                    ) 
                    : (
                        <>
                            <p className={task.isCompleted ? "textCompleted" : ""}>{task.title}</p>
                            
                        </>
                    )
                }

                {taskEditing === task.id && !task.isCompleted ? (
                    <button className="editButton" onClick={() => onEdit(task.id)}>
                        <VscSaveAs size={24} />
                    </button>
                ) : (
                    <button className="editButton" onClick={() => setTaskEditing(task.id)}>
                        <FiEdit3 size={24} />
                    </button>
                ) }

                <button className="deleteButton" onClick={() => onDelete(task.id)}>
                    <TbTrash size={26} />
                </button>
            </div>
            <p className="date">{task.date}</p>
        </>
    )
}