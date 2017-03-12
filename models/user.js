'use strict'

let mongoose = require('mongoose')
const Promise = require('bluebird')

// estableciendo bluebird como el proveedor de promises de mongoose
mongoose.Promise = Promise

const Schema = mongoose.Schema
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
const crypto = require('crypto')

const UserSchema = Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  displayName: String,
  avatar: String,
  password: {
    type: String,
    select: false
  },
  signupDate: {
    type: Date,
    default: Date.now()
  },
  lastLogin: Date
})

UserSchema.pre('save', (next) => {
  let user = this

  if (!user.isModified('password')) return next()

  let salt = bcrypt.genSaltAsync(10)
  .then((hash) => {
    return bcrypt.hashAsync(user.password, salt, null)
  })
  .then((hash) => {
    user.password = hash
    next()
  })
  .catch((err) => {
    return next(err)
  })
})

UserSchema.methodos.gravatar = function () {
  if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)
