// server.js
import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/get-key', (req, res) => {
  const filePath = req.query.path;
  if (!filePath) return res.status(400).send("Missing path");

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send("Key not found");
    res.send(data);
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
