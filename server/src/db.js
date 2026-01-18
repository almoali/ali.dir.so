const sqlite3 = require('better-sqlite3');
const db = new sqlite3('database.sqlite');
const bcrypt = require('bcrypt');

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS chats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );
`);

module.exports = {
  createUser: (email, password, name) => {
    const hash = bcrypt.hashSync(password, 10);
    const stmt = db.prepare('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)');
    return stmt.run(email, hash, name || email.split('@')[0]);
  },

  findUserByEmail: (email) => {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  },

  findUserById: (id) => {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
  },

  verifyPassword: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  },

  addMessage: (userId, role, content) => {
    const stmt = db.prepare('INSERT INTO chats (user_id, role, content) VALUES (?, ?, ?)');
    return stmt.run(userId, role, content);
  },

  getHistory: (userId, limit = 100) => {
    const stmt = db.prepare('SELECT role, content FROM chats WHERE user_id = ? ORDER BY timestamp ASC');
    return stmt.all(userId);
  }
};
