let data = {};

const addCat = (cat) => {
		if (cat) data[cat] = [];
};

const deleteCat = (cat) => delete data[cat];

const addProd = (cat, prod) => {
	if (prod) {
		id = data[cat].reduce( (memo, prod) => {
			return prod.id >= memo ? prod.id : memo; 
		},0) + 1;			
		data[cat].push({name: prod, id: id });		
	}
};

const deleteProd = (cat, id) => data[cat]  = data[cat].filter((prod) => prod.id !== id*1);
const getCatNames = () => Object.keys(data);
const getProdByCat = (cat) => data[cat].map((prod) => prod);

const seed = () => {
	data = [];
	const cats = ['Snacks', 'Meats'];
	const prodSnacks = ['3 Musketeers', 'Almond Pack', 'Oreos', 'Doritos'];
	const prodMeats = ['Fisheses', 'Stupid Fat Hobbit', 'Rabbits - Raw and Wrigglin\'', 'Orcs']
	cats.forEach( cat => addCat(cat));
	prodSnacks.forEach( prod => addProd('Snacks', prod));
	prodMeats.forEach( prod  => addProd('Meats', prod));
	console.log('Just Seeded the DB.');	
}

seed();

module.exports = {addCat: addCat, deleteCat: deleteCat, addProd: addProd, deleteProd: deleteProd, getCatNames: getCatNames, getProdByCat: getProdByCat, seed: seed };

// console.log('data = ', data);