require('dotenv').config({silent: true});
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const sanitize = require('sanitize-html');
const compression = require('compression');

const app = express();

// Define the port to run on
app.set('port', process.env.PORT);
app.engine('.hbs', exphbs({ }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'public'));
app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/myft-topic/public/style', express.static(path.join(__dirname, '/public')));

function sanitizeInput(input = '') {
  return sanitize((input), { allowedTags: [], allowedAttributes: []});
}

app.get('/myft-topic', (req, res, next) => {
  const topic = req.query.topic ? sanitizeInput(decodeURIComponent(req.query.topic)) : '';
  const conceptId = req.query.conceptId ? sanitizeInput(decodeURIComponent(req.query.conceptId)) : '';
  res.render('myft', { topic, conceptId });
});

app.get('/nbe-signup', (req, res, next) => {
  const name = req.query.name ? sanitizeInput(decodeURIComponent(req.query.name)) : '';
  res.render('nbe-signup', { name });
});

app.get('/newsletter', (req, res, next) => {
  res.render('newsletter', { name: sanitizeInput(decodeURIComponent(req.query.name))});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Listen for requests
const server = app.listen(app.get('port'), () => {
  const port = server.address().port;
  console.log('Magic happens on port ' + port);
});

