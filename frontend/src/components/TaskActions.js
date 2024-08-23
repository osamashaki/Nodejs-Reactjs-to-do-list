// src/components/TaskActions.js
import React from 'react';
import { markTaskAsDone, deleteTask } from '../api';

function TaskActions({ id }) {
    const handleMarkAsDone = async () => {
        await markTaskAsDone(id);
    };

    const handleDelete = async () => {
        await deleteTask(id);
    };

    return (
        <div>
            <button onClick={handleMarkAsDone}>Mark as Done</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default TaskActions;
