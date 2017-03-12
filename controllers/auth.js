'use strict'

const config = require('../config')
let mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services/index')
let user
// estableciendo bluebird como el proveedor de promises de mongoose
mongoose.Promise = require('bluebird')

function signUp (req, res) {
  mongoose.connect(config.db)
 .then(() => {
   user = new User({
     email: req.body.email,
     displayName: req.body.displayName
   })

   return user.save()
 })
 .then(() => {
   res.status(200).send({token: service.createToken(user)})
 })
 .then(() => {
   mongoose.disconnect()
 })
 .catch(err => {
   return res.status(500).send({message: `Error al crear el usuario: ${err}`})
 })
}

function signIn (req, res) {

}

module.exports = {
  signUp,
  signIn
}
