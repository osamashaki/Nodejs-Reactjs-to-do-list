const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000; // port number

// create connection
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: '',
    database: 'to_do_list_db'
});

// connect
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to db...');
});

app.use(bodyParser.json());
app.use(cors());

// get all tasks
app.get('/api/tasks', (req, res) => {
    db.query('SELECT * FROM tasks where is_deleted = 0', (err, results) => {
        if (err) {
            console.error('Error retrieving tasks:', err);
            res.status(500).send('Error fetching tasks');
        }
        res.json(results);
    });
})

app.get('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    db.query('SELECT * FROM tasks WHERE id = ?', [taskId], (err, results) => {
        if (err) {
            console.error('Error retrieving task:', err);
            res.status(500).send('Error fetching task');
        }
        res.json(results[0]);
    });
})

// get add task
app.get('/add-task', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/src/components', 'AddTask'));
});

// post new task
app.post('/api/tasks', (req, res) => {
    const newTask = req.body;
    db.query('INSERT INTO tasks (task, description, due_date) VALUES (?, ?, ?)', 
        [newTask.task, newTask.description, newTask.dueDate], 
        (err, results) => {
        if (err) {
            // console.error('Error inserting task:', err);
            res.status(500).json({ message: 'Error inserting task' });
        } else {
            res.json({ message : 'Task Added successfully' });
        }
        
    })
})

// mark task as done
app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    db.query('UPDATE tasks SET is_done = 1 WHERE id = ?', [taskId], (err, results) => {
        if (err) {
            console.error('Error updating task:', err);
            res.status(500).send('Error updating task');
        }
        res.json({ message: 'Task done successfully' });
    })
});

// delete task
app.put('/api/tasks/delete/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    db.query('UPDATE tasks SET is_deleted = 1 WHERE id = ?', [taskId], (err, results) => {
        if (err) {
            console.error('Error deleting task:', err);
            res.status(500).send('Error deleting task');
        }
        res.json({ message: 'Task deleted successfully' });
    })
});

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));