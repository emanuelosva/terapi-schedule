/**
 * **************************************
 * @fileoverview DB General CRUD service.
 * **************************************
 */

const mongoose = require('mongoose')

/**
 * A general DB access to perform basic crud operations
 */
class CRUD {
  constructor(model) {
    this.model = model
    this._db = mongoose.connection.db
  }

  create({ data }) {
    return this.model.create(data)
  }

  read({ query }) {
    return this.model.findOne(query)
  }

  readMany({ query }) {
    return this.model.find(query)
  }

  update({ query, data }) {
    return this.model.updateOne(query, data)
  }

  upsert({ query, data }) {
    return this.model.updateOne(query, data, { upsert: true })
  }

  delete({ id }) {
    return this.model.deleteOne({ _id: id })
  }

  /**
   * Retrieve a user (patient or psy) with his/her email.
   * This operation doesn't needs a specif mongoose model.
   * @param {string} email - The user email.
   * @param {string} scope - The user scope [psy, patient]
   */
  async getFromEmail(email, scope) {
    try {
      const collectioName = `${scope}s`
      const dbCollection = this._db.collection(collectioName)
      return dbCollection.findOne({ email })
    } catch (error) {
      return false
    }
  }
}

module.exports = {
  CRUD,
}
