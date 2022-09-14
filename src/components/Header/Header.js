import { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import './Header.css';

export function Header({ onAddTask }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddTask(title);
        setTitle('');
    }
    
    const onChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    return (
        <header className="header">
            <p className="header-text">todo</p>

            <form onSubmit={handleSubmit} className="newTaskForm">
                <input 
                    type="text"
                    placeholder="add a new task" 
                    value={title} 
                    maxlength="50"
                    onChange={onChangeTitle} />
                <button>
                    Create
                    <AiOutlinePlusCircle size={20} />
                </button>
            </form>
        </header>
    )
}
