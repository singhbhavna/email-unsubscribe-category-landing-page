require('dotenv').config({silent: true});
const express = require('express');
const path = require('path');

const app = express();

// Define the port to run on
app.set('port', process.env.PORT);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Listen for requests
const server = app.listen(app.get('port'), () => {
  const port = server.address().port;
  console.log('Magic happens on port ' + port);
});

