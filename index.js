'use strict'

const express = require('express')
let mongoose = require('mongoose')
//estableciendo bluebird como el proveedor de promises de mongoose
mongoose.Promise = require('bluebird')

const Product = require('./models/product')

const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/product', (req, res) => {
	Product.find({})
	.then((products) => {
		if(!products){
			return res.status(404).send({message: `No existen productos`})
		}

		res.status(200).send({products})
	})
	.catch((err) => {
		return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
	})
})

app.get('/api/product/:productId', (req, res) => {
	let productId = req.params.productId

	Product.findById(productId)
	.then((product) => {
		if(!product){
			return res.status(404).send({message: `El producto no existe`})
		}

		res.status(200).send({product})
	})
	.catch((err) => {
		return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
	})
})

app.post('/api/product', (req, res) => {
	let product = new Product()

	product.name = req.body.name
	product.picture = req.body.picture
	product.price = req.body.price
	product.category = req.body.category
	product.description = req.body.description

	product.save()
	.then((newProduct) => {
		res.status(200).send({newProduct})
	})
	.catch((err) => {
		return res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})
	})
})


app.put('/api/product/:productId', (req, res) => {
	let productId = req.params.productId
	let update = req.body

	Product.findByIdAndUpdate(productId, update)
	.then((updatedProduct) => {
		if(!updatedProduct){
			return res.status(404).send({message: `El producto no existe`})
		}

		res.status(200).send({updatedProduct})
	})
	.catch((err) => {
		return res.status(500).send({message: `Error al actualizar: ${err}`})
	})
})

app.delete('/api/product/:productId', (req, res) => {
	let productId = req.params.productId

	Product.findById(productId)
	.then((product) => {
		if(!product){
			return res.status(404).send({message: `El producto no existe`})
		}

		return product.remove()
	})
	.then((deletedProduct) => {
		res.status(200).send({deletedProduct})
	})
	.catch((err) => {
		return res.status(500).send({message: `Error al eliminar: ${err}`})
	})
})

mongoose.connect('mongodb://localhost:27017/shop')
.then((res) => {
	console.log('Conexion a la base de datos establecida...')

	app.listen(port, () => {
		console.log(`API REST corriendo en http://localhost:${port}`)
	})
})
.catch((err) => {
	return console.log(`Error al conectar a la base de datos: ${err}`)
})
