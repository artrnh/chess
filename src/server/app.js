const express = require('express');

const app = express();

app.use(express.static('public'));
app.get('/api/getTestData', (req, res) => res.json('Test!'));

app.listen(8080, () => console.log('Listening on port 8080!'));
