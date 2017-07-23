const express = require('express');
const path = require('path');
const nunjucks =  require('nunjucks');
let {seed, getCatNames, getProdByCat, addCat, deleteCat, addProd, deleteProd} = require('./db');

const app = express();
app.use(express.static(__dirname + '/node_modules'));

app.set('view engine', 'html')
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

app.get('/', (req, res) => {
	res.render('index', {catNames: getCatNames()} );
} );

app.get('/categories/:category', (req, res) => {
	const cat = req.params.category;
	res.render('category', {activeCat: cat,  products: getProdByCat(cat), catNames: getCatNames()});
});

app.get('/seed', (req, res) => {
	seed();
	res.redirect('/');
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening intently on port ${port}`))