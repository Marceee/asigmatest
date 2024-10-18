const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const cors = require('cors');
const port = 3001;

app.use(express.json()); // to parse JSON bodies
app.use(cors());

// Create a new SQLite database
const db = new sqlite3.Database('todos.db');

// Create a table for storing todos
db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    completed INTEGER DEFAULT 0
  )
`);

// Define an API endpoint for adding a new to do
app.post('/todos', (req, res) => {
  const { text } = req.body;
  db.run('INSERT INTO todos (text) VALUES (?)', text);
  res.json({ message: 'Todo added successfully' });
});

// Define an API endpoint for retrieving all todos
app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ todos: rows });
    }
  });
});

// Define an API endpoint for marking a to do as completed
app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  db.run('UPDATE todos SET completed = 1 WHERE id = ?', id);
  res.json({ message: 'Todo marked as completed' });
});

// Define an API endpoint for retrieving completed todos
app.get('/todos/completed', (req, res) => {
  db.all('SELECT * FROM todos WHERE completed = 1', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ todos: rows });
    }
  });
});

// Define an API endpoint for retrieving uncompleted todos
app.get('/todos/uncompleted', (req, res) => {
  db.all('SELECT * FROM todos WHERE completed = 0', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ todos: rows });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
