
const express = require("express");

const app = express();
const bodyparser = require("body-parser");

const port = process.env.PORT || 3200;


var products = [
		{
			img: 'assets/img/product-1.jpg',
			name: 'Product 1',
			price: '100',
			currency: '$'
		},
		{
			img: 'assets/img/product-2.jpg',
			name: 'Product 2',
			price: '200',
			currency: '$'
		},
		{
			img: 'assets/img/product-3.jpg',
			name: 'Product 3',
			price: '300',
			currency: '$'
		},
		{
			img: 'assets/img/product-4.jpg',
			name: 'Product 4',
			price: '400',
			currency: '$'
		},
		{
			img: 'assets/img/product-5.jpg',
			name: 'Product 5',
			price: '500',
			currency: '$'
		},
		{
			img: 'assets/img/product-6.jpg',
			name: 'Product 6',
			price: '600',
			currency: '$'
		},
		{
			img: 'assets/img/product-7.jpg',
			name: 'Product 7',
			price: '700',
			currency: '$'
		},
		{
			img: 'assets/img/product-8.jpg',
			name: 'Product 8',
			price: '800',
			currency: '$'
		}
	];

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get("/products-list", (req, res) => {
  res.status(200).send(products);
});


app.listen(port, () => {
  console.log(`running at port ${port}`);
});