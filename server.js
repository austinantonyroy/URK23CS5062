const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS) from public folder
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // 🧠 your MySQL username
  password: '',           // 🔐 your MySQL password
  database: 'food_app'    // 🍽️ database name
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL Database');
});

// Handle order submission
app.post('/order', (req, res) => {
  const { name, phone, item, quantity } = req.body;

  if (!name || !phone || !item || !quantity) {
    return res.status(400).json({ message: "❗ Please fill all the fields." });
  }

  const sql = 'INSERT INTO orders (name, phone, item, quantity) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, phone, item, quantity], (err, result) => {
    if (err) {
      console.error('❌ DB Insert Error:', err);
      return res.status(500).json({ message: 'Server Error' });
    }

    res.json({ message: "✅ Order placed successfully!" });
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
