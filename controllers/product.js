'use strict'

const Product = require('../models/product')

function getProduct (req, res) {
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
}

function getProducts (req, res) {
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
}

function saveProduct (req, res) {
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
}

function updateProduct (req, res) {
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
}

function deleteProduct (req, res) {
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
}

module.exports = {
	getProduct,
	getProducts,
	saveProduct,
	updateProduct,
	deleteProduct,
}
