import { Task } from '../Task/Task';
import './TaskList.css';

export function TaskList({ 
    tasks, 
    onComplete, 
    onDelete, 
    setTasksAndSave
}) {
    const tasksQuantity = tasks.length;
    const completedTasks = tasks.filter(task => task.isCompleted).length;

    return (
        <section className="tasks">
            <header className="top">
                <div>
                    <p>Create tasks</p>
                    <span>{tasksQuantity}</span>
                </div>
                <div>
                    <p>Completed tasks</p>
                    <span>{completedTasks} of {tasksQuantity}</span>
                </div>
            </header>

            <div className="list">
                {tasks.map(task => (
                    <Task 
                        key={task.id} 
                        task={task} 
                        tasks={tasks}
                        onComplete={onComplete}
                        onDelete={onDelete}
                        setTasksAndSave={setTasksAndSave}
                    />
                ))}
            </div>
        </section>
    )
}