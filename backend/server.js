// backend/server.js
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Create items table if it doesn't exist
pool.query(`
    CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
    )
`);

// Get all items
app.get("/api/items", async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM items");
    res.json(rows);
});

// Add an item
app.post("/api/items", async (req, res) => {
    const { name, description } = req.body;
    const result = await pool.query(
        "INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *",
        [name, description]
    );
    res.status(201).json(result.rows[0]);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
