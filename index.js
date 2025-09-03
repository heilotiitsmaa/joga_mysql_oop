const express = require('express');
const db = require('./utils/db'); // Assumes utils/db.js exports a connection or pool

const app = express();
const PORT = 3000;

app.get('/test-db', async (req, res) => {
    try {
        // Simple query to test connection
        const [rows] = await db.query('SELECT 1 + 1 AS solution');
        res.json({ success: true, result: rows[0].solution });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});