const API_URL = 'http://localhost:5000/api';

export async function getAllTasks() {
    const response = await fetch(`${API_URL}/tasks`);
    return response.json();
}

export async function getTask(id) {
    const response = await fetch(`${API_URL}/tasks/${id}`);
    return response.json();
}

export async function addTask(task) {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return response.json();
}

export async function markTaskAsDone(id) {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_done: 1 }),
    });
    return response.json();
}

export async function deleteTask(id) {
    const response = await fetch(`${API_URL}/tasks/delete/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_deleted: 1 }),
    });
    return response.json();
}
