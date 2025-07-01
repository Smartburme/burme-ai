// server.js require('dotenv').config({ path: '/-1@2L/6541/76@015/.env' }); const express = require('express'); const cors = require('cors'); const fetch = require('node-fetch');

const app = express(); const PORT = process.env.PORT || 3000; const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(cors()); app.use(express.json());

app.post('/api/gemini', async (req, res) => { const { message, mode } = req.body;

if (!GEMINI_API_KEY) { return res.status(500).json({ error: 'Gemini API key not found.' }); }

const endpoint = https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY};

try { const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [ { parts: [ { text: message } ] } ] }) });

const data = await response.json();
const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠ Gemini returned no result.";

res.json({ reply: result });

} catch (err) { console.error('Gemini API error:', err); res.status(500).json({ error: 'Gemini API request failed.' }); } });

app.listen(PORT, () => { console.log(🚀 Server running on http://localhost:${PORT}); });

