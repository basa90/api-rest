'use strict'

//servicio para crear un token de seguridad
const config = require('../config')
const jwt = require('jwt-simple')
const moment = require('moment')

function createToken (user) {
	const payload = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix()
	}

	return jwt.encode(payload, config.secret_token)
}

module.exports = createToken
