const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;
const api = require('./routes/index.js');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);

// Static middleware pointing to the public folder
app.use(express.static('./public'));

// Create Express.js routes
// Page with existing notes listed 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, ()=> {
    console.log(`Listening at http://localhost:${PORT}` );
})