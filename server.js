const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


// GET - sabhi tasks
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST - naya task banao
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  db.query('INSERT INTO tasks (title) VALUES (?)', [title], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, title });
  });
});

// PUT - task update karo
app.put('/tasks/:id', (req, res) => {
  const { title } = req.body;
  db.query('UPDATE tasks SET title=? WHERE id=?', [title, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Task updated!' });
  });
});

// DELETE - task hatao
app.delete('/tasks/:id', (req, res) => {
  db.query('DELETE FROM tasks WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Task deleted!' });
  });
});

app.listen(5000, () => {
  console.log('Server chal raha hai port 5000 pe');
});

