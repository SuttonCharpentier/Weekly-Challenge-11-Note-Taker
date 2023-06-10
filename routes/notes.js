// Modules
const notes = require('express').Router();
const fs = require('fs');
const uniqid = require('uniqid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        (err) ? err : res.json(JSON.parse(data));
    });
});

// POST Route for notes
notes.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { text, title } = req.body;
    // If all the required properties are present
    if (text && title) {
        // Variable for the object we will save
        const newNote = { text, title, id: uniqid() };
        fs.readFile('./db/db.json', (err, data) => {
            (err) ? err : res.json(JSON.parse(data));
             // Convert string into JSON object
            const parsedNote = JSON.parse(data);
            // Add a new note
            parsedNote.push(newNote);
            fs.writeFileSync('./db/db.json', JSON.stringify(parsedNote, null, 4), (err) => {
                const response = {
                    status: 'success',
                    body: newNote,
                };
                res.json(response);
                console.log(response);
                if (err) throw err;
            })
        })
    }
});

// DELETE Route for a specific note
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
          console.error(err);
        }
        // Convert string into JSON object
        const json = JSON.parse(data);
        const result = json.filter((note) => note.id !== noteId);
        try {
          fs.writeFileSync('./db/db.json', JSON.stringify(result,null,4));
          console.log(`Item ${noteId} has been deleted 🗑️`);
          res.json(`Item ${noteId} has been deleted 🗑️`);
        } catch (err) {
          console.error(err);
        }
      });
});
module.exports = notes;