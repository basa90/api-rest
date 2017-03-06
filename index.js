'use strict'

const config = require('./config')

let mongoose = require('mongoose')
//estableciendo bluebird como el proveedor de promises de mongoose
mongoose.Promise = require('bluebird')
const app = require('./app')

app.listen(config.port, () => {
	console.log(`API REST corriendo en http://localhost:${config.port}`)
})
