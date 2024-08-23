// TaskList.js

import React, { useState, useEffect } from 'react';
import '../css/TaskList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { markTaskAsDone } from '../api';
import { deleteTask, getAllTasks } from '../api';


const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
};

const TaskList = () => {

    const [message, setMessage] = useState('');
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 2000); // Clear the message after 3 seconds

            return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts or message changes
        }
    }, [message]);

    const fetchTasks = async () => {
        try {
            const response = await getAllTasks();                
            setTasks(response);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    
    const handleMarkAsDone = async (id) => {
        try {
            const result = await markTaskAsDone(id);
            // Update the task list to reflect the change
            setMessage(result.message);
            setTasks(tasks.map(task => 
                task.id === id ? { ...task, is_done: 1 } : task
            ));
        } catch (error) {
            console.error('Error marking task as done:', error);
        }
    };

    const handleMarkAsDeleted = async (id) => {
        try {
            const result = await deleteTask(id);
            // Update the task list to reflect the change
            setMessage(result.message);
            fetchTasks();
        } catch (error) {
            console.error('Error in delete task', error);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Task List</h1>
                {message && <div className="message">{message}</div>}

                <Link to="/add-task" className="add-task-button">
                    <FontAwesomeIcon icon={faPlus} /> Add New Task
                </Link>
            </div>
            <li className="task-header">
                <span className="task-column">Task</span>
                <span className="task-column">Desc</span>
                <span className="task-column">Due Date</span>
                <span className="task-column">Actions</span>
            </li>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className="task-item">
                        <span className="task-text">
                            {task.task} - {task.description} - {formatDate(task.due_date)}
                        </span>
                        {task.is_done ? (
                            <span className="task-done">Done</span>
                        ) : (
                            <button className="complete-btn" onClick={() => handleMarkAsDone(task.id)}>Mark as Done</button>
                        )}
                        
                        <button onClick={() => handleMarkAsDeleted(task.id)} className="delete-btn">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
