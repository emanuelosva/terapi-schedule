/**
 * *************************************
 * @fileoverview Psychologists DB model.
 * *************************************
 */

const mongoose = require('mongoose')
const nanoid = require('nanoid')
const bcrypt = require('bcrypt')
const { config } = require('../../config')

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
  email: stringRequired,
  password: stringRequired,
  firstName: stringRequired,
  lastName: stringRequired,
  cedule: stringRequired,
  description: stringRequired,
})

/**
 * Hash password before save on db.
 */
PsySchema.pre('save', async (next) => {
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
