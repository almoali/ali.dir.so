const path = require('path');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const db = require('./db');
const SYSTEM_PROMPT = require('./prompt');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || 'dev_secret_key_123';

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the project root
app.use(express.static(path.join(__dirname, '../../')));

// Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-001", // Using specific version to avoid 404
    systemInstruction: SYSTEM_PROMPT
});

// --- Auth Middleware ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// --- Routes ---

// Serve the main index.html at the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
});

// Signup
app.post('/api/auth/signup', (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    try {
        const existing = db.findUserByEmail(email);
        if (existing) return res.status(409).json({ error: "User already exists" });

        const result = db.createUser(email, password, name);
        const token = jwt.sign({ id: result.lastInsertRowid, email, name }, SECRET_KEY, { expiresIn: '24h' });

        res.json({ token, user: { id: result.lastInsertRowid, email, name } });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    try {
        const user = db.findUserByEmail(email);
        if (!user || !db.verifyPassword(password, user.password_hash)) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get Current User (Refresh Profile)
app.get('/api/auth/me', authenticateToken, (req, res) => {
    try {
        const user = db.findUserById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        // Return fresh user info
        res.json({ user: { id: user.id, email: user.email, name: user.name } });
    } catch (err) {
        console.error("Auth Me Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Chat
app.post('/api/chat', authenticateToken, async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    try {
        const userId = req.user.id;

        // 1. Get History (Convert to Gemini format)
        // Gemini expects { role: 'user' | 'model', parts: [{ text: '...' }] }
        const historyRaw = db.getHistory(userId, 6); // Fetch 6 messages for context

        const history = historyRaw.map(h => ({
            role: h.role === 'user' ? 'user' : 'model', // Map 'assistant' (from DB) to 'model' (for Gemini)
            parts: [{ text: h.content }]
        }));

        const chat = model.startChat({
            history: history
        });

        // 2. Call Gemini
        const result = await chat.sendMessage(message);
        const reply = result.response.text();

        // 3. Save User msg and Assistant reply
        db.addMessage(userId, 'user', message);
        db.addMessage(userId, 'assistant', reply); // Storing as 'assistant' in DB ensures standard format

        res.json({ reply });

    } catch (err) {
        console.error("Chat Error Detailed:", err);
        const errorMessage = err?.message || "Failed to generate response. Check server console.";
        res.status(500).json({ error: errorMessage });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Access the website at http://localhost:${PORT}`);
});
