'use strict'

const config = require('./config')

let mongoose = require('mongoose')
//estableciendo bluebird como el proveedor de promises de mongoose
mongoose.Promise = require('bluebird')
const app = require('./app')


mongoose.connect(config.db)
.then((res) => {
	console.log('Conexion a la base de datos establecida...')

	app.listen(config.port, () => {
		console.log(`API REST corriendo en http://localhost:${config.port}`)
	})
})
.catch((err) => {
	return console.log(`Error al conectar a la base de datos: ${err}`)
})
