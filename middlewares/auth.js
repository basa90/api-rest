'use strict'

// middleware para comprobar la validez y la vigencia de la autorizacion del token
const config = require('../config')
const jwt = require('jwt-simple')
const moment = require('moment')

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorizacion' })
  }

  const token = req.headers.authorization.split(' ')[1]
  const payload = jwt.decode(token, config.secret_token)

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({message: 'El token ha expirado'})
  }

  req.user = payload.sub
  next()
}

module.exports = {isAuth}
