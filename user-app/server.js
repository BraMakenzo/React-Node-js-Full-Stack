const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Simple auth middleware - checks headers on every request
app.use((req, res, next) => {
  const username = req.headers['x-username'];
  const password = req.headers['x-password'];
  if (username === "admin" && password === "pass123") {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized: Invalid credentials" });
  }
});

// PostgreSQL connection setup
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ekco_db",
  password: "Kenneth@007",
  port: 5432,
});

// Test DB connection once on startup
pool.connect()
  .then(client => {
    console.log("✅ Connected to PostgreSQL database successfully");
    client.release();
  })
  .catch(err => {
    console.error("❌ Failed to connect to PostgreSQL database:", err.message);
    process.exit(1);
  });

// Root route
app.get("/", (req, res) => {
  res.send("Hello from Express + PostgreSQL!");
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    const formattedUsers = result.rows.map(user => ({
      ...user,
      date_of_birth: user.date_of_birth ? user.date_of_birth.toISOString().split("T")[0] : null,
      date_added: user.date_added ? user.date_added.toISOString().split("T")[0] : null,
    }));
    res.json(formattedUsers);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).send("Server error");
  }
});

// Add new user
app.post("/users", async (req, res) => {
  const { name, date_of_birth, occupation, gender, date_added } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (name, date_of_birth, occupation, gender, date_added)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, date_of_birth, occupation, gender, date_added]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding user:", err.message);
    res.status(500).send("Server error");
  }
});

// Update user
app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const { name, date_of_birth, occupation, gender, date_added } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users
       SET name=$1, date_of_birth=$2, occupation=$3, gender=$4, date_added=$5
       WHERE id=$6 RETURNING *`,
      [name, date_of_birth, occupation, gender, date_added, id]
    );
    if (result.rowCount === 0) {
      res.status(404).send("User not found");
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error("Error updating user:", err.message);
    res.status(500).send("Server error");
  }
});

// Delete user
app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query("DELETE FROM users WHERE id=$1", [id]);
    if (result.rowCount === 0) {
      res.status(404).send("User not found");
    } else {
      res.send("User deleted");
    }
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).send("Server error");
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
