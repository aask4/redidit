const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const router = require('./resources/router')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(router.router);


app.get('*', (req, res)=> {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'))
});

module.exports = app;
