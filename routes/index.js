'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const auth = require('../middlewares/auth')
const api = express.Router()

api.use(auth.isAuth)
api.get('/private', function (req, res) {
	res.status(200).send({message: 'Tienes acceso'})
})
api.get('/product', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', productCtrl.saveProduct)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)

module.exports = api
