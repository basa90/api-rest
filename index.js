'use strict'

const config = require('./config')
const app = require('./app')

app.listen(config.port, () => {
	console.log(`API REST corriendo en http://localhost:${config.port}`)
})
