'use strict'

const config = require('./config')
const app = require('./app')
let mongoose = require('mongoose')
// estableciendo bluebird como el proveedor de promises de mongoose
mongoose.Promise = require('bluebird')

mongoose.connect(config.db)
.then(() => {
  app.listen(config.port, () => {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
  })
})
.catch((err) => {
  console.log(`Error de conexion con la base de datos: ${err}`)
})
