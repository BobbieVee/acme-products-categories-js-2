const express = require('express');
const path = require('path');
const nunjucks =  require('nunjucks');
const methodOverride =  require('method-override');
const bodyParser = require('body-parser');
let {seed, getCatNames, getProdByCat, addCat, deleteCat, addProd, deleteProd, data} = require('./db');

const app = express();
app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'html')
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
	res.render('index', {catNames: getCatNames(), data: data });
} );

app.get('/categories/:category', (req, res) => {
	const cat = req.params.category;
	res.render('category', {activeCat: cat,  products: getProdByCat(cat), catNames: getCatNames(), data: data});
});

app.delete('/categories/:category', (req, res) => {
	deleteCat(req.params.category);
	res.redirect('/');
});

app.delete('/categories/:category/:productId', (req, res) => {
	const cat = req.params.category;
	const prodId = req.params.productId
	deleteProd(cat, prodId);
	res.redirect(`/categories/${cat}`);
})

app.get('/seed', (req, res) => {
	seed();
	res.redirect('/');
});

app.post('/categories/:category', (req, res) => {
	const cat = req.params.category;
	addProd(cat, req.body.product);
	res.redirect(`/categories/${cat}`);
});

app.post('/categories', (req, res) => {
	addCat(req.body.category);
	res.redirect(`/`);
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening intently on port ${port}`))