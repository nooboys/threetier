const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Connect to SQLite database (stored in the 'database' folder)
const db = new sqlite3.Database('/data/database.db');

// Create a table and insert a sample record
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS data (info TEXT)");
    db.run("INSERT INTO data (info) VALUES ('Hello from the database!')");
});

// API to get data
app.get('/api/data', (req, res) => {
    db.get("SELECT info FROM data", (err, row) => {
        if (err) {
            res.status(500).json({error: "Database error"});
        } else {
            res.json({message: row.info});
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});
