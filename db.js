const data = {};

const addCat = (cat) => 	data[cat] = [];
const deleteCat = (cat) => delete data[cat];

const addProd = (cat, prod) => {
		id = data[cat].reduce( (memo, prod) => {
			return prod.id >= memo ? prod.id : memo; 
		},0) + 1;			
	data[cat].push({name: prod, id: id });
};

const deleteProd = (cat, id) => data[cat] = data[cat].filter((prod) => prod.id !== id);
const getCatNames = () => Object.keys(data);
const getProdByCat = (cat) => data[cat].map((prod) => prod);

const seed = () => {
	addCat('Snacks');
	addProd('Snacks', '3 Musketeers');
	addProd('Snacks', 'Almond Pack');
	addCat('Meats');
	addProd('Meats', 'Fisheses');
	addProd('Meats', 'Fat Hobbit');
	console.log('Just Seeded the DB.');	
}

seed();

module.exports = {addCat: addCat, deleteCat: deleteCat, addProd: addProd, deleteProd: deleteProd, getCatNames: getCatNames, getProdByCat: getProdByCat, seed: seed };

// console.log('data = ', data);