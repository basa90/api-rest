'use strict'

const config = require('../config')
const Product = require('../models/product')
let mongoose = require('mongoose')
// estableciendo bluebird como el proveedor de promises de mongoose
mongoose.Promise = require('bluebird')

function getProduct (req, res) {
  mongoose.connect(config.db)
  .then(() => {
    let productId = req.params.productId

    return Product.findById(productId)
  })
  .then(product => {
    if (!product) {
      return res.status(404).send({message: `El producto no existe`})
    }

    res.status(200).send({product})
  })
  .then(() => {
    mongoose.disconnect()
  })
  .catch(err => {
    return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
  })
}

function getProducts (req, res) {
  mongoose.connect(config.db)
  .then(() => {
    return Product.find({})
  })
  .then(products => {
    if (!products) {
      return res.status(404).send({message: `No existen productos`})
    }

    res.status(200).send({products})
  })
  .then(() => {
    mongoose.disconnect()
  })
  .catch(err => {
    return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
  })
}

function saveProduct (req, res) {
  mongoose.connect(config.db)
  .then(() => {
    let product = new Product()

    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    return product.save()
  })
  .then(newProduct => {
    res.status(200).send({newProduct})
  })
  .then(() => {
    mongoose.disconnect()
  })
  .catch(err => {
    return res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})
  })
}

function updateProduct (req, res) {
  mongoose.connect(config.db)
  .then(() => {
    let productId = req.params.productId
    let update = req.body

    return Product.findByIdAndUpdate(productId, update)
  })
  .then(updatedProduct => {
    if (!updatedProduct) return res.status(404).send({message: `El producto no existe`})

    res.status(200).send({updatedProduct})
  })
  .then(() => {
    mongoose.disconnect()
  })
  .catch(err => {
    return res.status(500).send({message: `Error al actualizar: ${err}`})
  })
}

function deleteProduct (req, res) {
  mongoose.connect(config.db)
  .then(() => {
    let productId = req.params.productId

    return Product.findById(productId)
  })
  .then(product => {
    if (!product) return res.status(404).send({message: `El producto no existe`})

    return product.remove()
  })
  .then(deletedProduct => {
    res.status(200).send({deletedProduct})
  })
  .then(() => {
    mongoose.disconnect()
  })
  .catch(err => {
    return res.status(500).send({message: `Error al eliminar: ${err}`})
  })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
