'use strict'

const express = require('express')
const mongoose = require('mongoose')

const Product = require('./models/product')

const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/product', (req, res) => {
	res.status(200).send({products: []})
})

app.get('/api/product/:productId', (req, res) => {

})

app.post('/api/product', (req, res) => {
	console.log('POST /api/product')
	console.log(req.body)

	let product = new Product()

	product.name = req.body.name
	product.picture = req.body.picture
	product.price = req.body.price
	product.category = req.body.category
	product.description = req.body.description

	product.save((err, newProduct) => {
		if (err) {
			res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})
		}

		res.status(200).send({product: newProduct})
	})
})

app.put('/api/product/:productId', (req, res) => {

})

app.delete('/api/product/:productId', (req, res) => {

})

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
	if (err) {
		return console.log(`Error al conectar a la base de datos: ${err}`)
	}
	console.log('Conexion a la base de datos establecida...')

	app.listen(port, () => {
		console.log(`API REST corriendo en http://localhost:${port}`)
	})
})
