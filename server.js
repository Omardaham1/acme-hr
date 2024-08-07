const express = require('express');
const path = require('path');
const pool = require('./database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// API route to get all employees
app.get('/api/v1/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching employees', err);
        res.status(500).send('Internal Server Error');
    }
});

// Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
