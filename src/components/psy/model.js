/**
 * *************************************
 * @fileoverview Psychologists DB model.
 * *************************************
 */

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid')
const { config } = require('../../config')
const { raiseError, httpErrors } = require('../../lib/errorManager')

/**
 * Required String Type (DRY)
 */
const stringRequired = {
  type: String,
  required: true,
}

/**
 * Psychologist DB model
 */
const PsySchema = mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  email: { ...stringRequired, unique: true },
  password: stringRequired,
  firstName: stringRequired,
  lastName: stringRequired,
  cedula: stringRequired,
  description: stringRequired,
})

/**
 * Email is unique
 */
PsySchema.pre('save', async function (next) {
  try {
    const db = mongoose.connection.db
    const existingEmail = await db
      .collection('psys')
      .findOne({ email: this.email })

    if (!existingEmail) return next()
    return raiseError('Email already exists', httpErrors.conflict)
  } catch (error) {
    next(error)
  }
})

/**
 * Hash password before save on db.
 */
PsySchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  try {
    this.password = await bcrypt.hash(this.password, config.auth.saltFactor)
    return next()
  } catch (error) {
    return next(error)
  }
})

const PsyModel = mongoose.model('Psy', PsySchema, 'psys')

module.exports = {
  PsyModel,
}
