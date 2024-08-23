// src/components/AddTask.js
import React, { useState, useEffect } from 'react';
import { addTask } from '../api';
import '../css/AddTask.css';

function AddTask() {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { task, description, dueDate };
        const result = await addTask(newTask);
        setMessage(result.message);
        // redirect to task list
        
        // reset form
        setTask('');
        setDescription('');
        setDueDate('');
    };

    const handleBack = async (e) => {
        e.preventDefault();
        window.location.href = '/';
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
                window.location.href = '/';
            }, 2000); // Clear the message after 3 seconds

            return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts or message changes
        }
    }, [message]);

    return (
        <div className="add-task-container">
            <h1>Add New Task</h1>
            {message && <div className="message">{message}</div>}

            <form onSubmit={handleSubmit} className="add-task-form">
                <div className="form-group">
                    <label className="task-column">Task</label>
                    <input className="task-column" type="text" value={task} onChange={(e) => setTask(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="task-column">Description</label>
                    <input className="task-column" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="task-column">Due Date</label>
                    <input className="task-column" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                </div>
                <div className="btns-group">
                <button type="submit" className="task-column add-task-btn">Add New Task</button>          
                <button type="button" onClick={handleBack} className="task-column add-task-btn"> Cancel </button>          
                </div>
            </form>
        </div>
    );
}

export default AddTask;
