const app =  require('express').Router();
const {seed, getCatNames, getProdByCat, addCat, deleteCat, addProd, deleteProd, data} = require('../db');


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
	deleteProd(cat, req.params.productId);
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

module.exports = app;