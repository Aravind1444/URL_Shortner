const express = require('express');
const api = require('./api');
const app = express();
const { urls } = require('./url_data');
const port = process.env.PORT || 3000;


app.use(express.json());

app.use('/api', api);

app.use(express.static('public'));

app.get('/:id', (req, res) => {
    const response = urls[req.params.id];
    if(response) {
        res.redirect(response);
    }
    else{
        res.status(404).send();
    }
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`)
});