const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// ✅ Route to copy sample.txt to created/:filename
router.get('/create/:filename', function (req, res) {
  const fileName = req.params.filename;
  const sourcePath = path.join(__dirname, '..', 'public', 'sample.txt');
  const targetPath = path.join(__dirname, '..', 'created', fileName);

  fs.copyFile(sourcePath, targetPath, (err) => {
    if (err) {
      return res.status(500).send('File creation failed.');
    }
    res.send(`File '${fileName}' created successfully.`);
  });
});

// ✅ Route to read file from created/
router.get('/:filename', function (req, res) {
  const filePath = path.join(__dirname, '..', 'created', req.params.filename);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).send('File not found.');
    res.send(`<pre>${data}</pre>`);
  });
});

module.exports = router;

