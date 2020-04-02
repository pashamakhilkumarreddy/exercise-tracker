const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const PORT = parseInt(config.server.port) || 5000;

app.use(cors());
app.use(express.json());

const uri = config.database.atlasURI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log(`Successfully connected to the database`);
});

require('./routes')(app);

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});