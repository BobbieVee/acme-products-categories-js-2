const express = require('express');
const path = require('path');
const nunjucks =  require('nunjucks');
const methodOverride =  require('method-override');
const bodyParser = require('body-parser');
const routes = require('./routes');


const app = express();
app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});
app.use(methodOverride('_method'));

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening intently on port ${port}`));