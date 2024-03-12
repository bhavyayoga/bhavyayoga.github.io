const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3030;

const folderName = '/src';
app.use(express.static(path.join(__dirname, folderName)));

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('404: Not Found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
