var { db, helpers } = require('../database')

class Test {
    static getAllUsers(CurrentUserId) {
      return helpers.getRows('SELECT * FROM User')
    }
  }

module.exports = Test