/**
 * **************************************
 * @fileoverview DB General CRUD service.
 * **************************************
 */

const db = require('mongoose')

/**
 * A general DB access to perform basic crud operations
 */
class CRUD {
  constructor(model) {
    this.model = model
  }

  create({ data }) {
    return this.model.create(data)
  }

  read({ query, relation }) {
    const pathPopulate = relation || undefined
    return this.model.findOne(query).populate(pathPopulate)
  }

  readMany({ query, relation }) {
    const pathPopulate = relation || undefined
    return this.model.findMany(query).populate(pathPopulate)
  }

  update({ id, data }) {
    return this.model.updateOne({ _id: id }, { ...data })
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
      const dbCollection = db.connection.db.collection(collectioName)
      return dbCollection.findOne({ email })
    } catch (error) {
      return false
    }
  }
}

module.exports = {
  CRUD,
}
