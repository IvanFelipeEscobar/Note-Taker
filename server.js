// dependencies
const express = require(`express`)
const path = require('path');
const uuid = require('uuid-random');
let notes = require(`./db/db.json`) //access json file in directory
const PORT = process.env.PORT || 3001;
const app = express();
//middleware that parses incoming req. w/ json payload
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`public`));
//api routes
app.get('/api/notes', (req, res) => res.json(notes));
app.post(`/api/notes`, (req, res) => {
    const title = req.body.title
    const text = req.body.text
    const newNote = {
        title,
        text,
        id: uuid()
    }
    notes.push(newNote)
    res.json(notes)
})
app.delete(`/api/notes/:id`, (req, res) => {
    notes.forEach((note) => {
        if (note.id === req.params.id) {
            notes = notes.filter(note => note.id !== req.params.id)
            res.json(notes)
        }
    })
})
//page routes
app.get(`/notes`, (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.get(`*`, (req, res) => res.sendFile(`index.html`));

app.listen(PORT, () => console.log(`${uuid()}: listening to port http://localhost${PORT}`));