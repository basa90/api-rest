'use strict'

let mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services/index')
//estableciendo bluebird como el proveedor de promises de mongoose
mongoose.Promise = require('bluebird')

function signUp (req, res) {
	const user = new User({
		email = req.body.email,
		displayName = req.body.displayName
	})

	user.save()
	.then(() => {
		res.status(200).send({ token: service.createToken(user)})
	})
	.catch((err) => {
		return res.status(500).send({`Error al crear el usuario: ${err}`})
	})
}

function signIn (req, res) {

}

module.exports = {
	signUp,
	signIn
}
