// src/components/Task.js
import React, { useEffect, useState } from 'react';
import { getTask } from '../api';

function Task({ match }) {
    const [task, setTask] = useState(null);
    const { id } = match.params;

    useEffect(() => {
        async function fetchTask() {
            const task = await getTask(id);
            setTask(task);
        }
        fetchTask();
    }, [id]);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Task Details</h1>
            <p>Task: {task.task}</p>
            <p>Description: {task.description}</p>
            <p>Due Date: {task.due_date}</p>
        </div>
    );
}

export default Task;
