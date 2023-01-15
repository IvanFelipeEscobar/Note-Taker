const express = require(`express`)
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('*', (req, res) => res.sendFile(`index.html`));
app.get(`/notes`, (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
  });
app.post(`api/notes`, (req, res) => req.json(res) )

app.listen(PORT, () => console.log(`listening to port ${PORT}`))