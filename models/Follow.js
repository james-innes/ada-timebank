var { db, helpers } = require('../database')

class Follow {
    static findByGivenUserId(GivenUserId) {
      var row = helpers.getRows('SELECT * FROM Follow WHERE GivenUserId = ?', [GivenUserId])
  
      if (row) {
        return new Follow(row)
      } else {
        return null
      }
    }
  
    static findByReceiptUserId(ReceiptUserId) {
      var row = helpers.getRows('SELECT * FROM Follow WHERE ReceiptUserId = ?', [ReceiptUserId])
  
      if (row) {
        return new Follow(row)
      } else {
        return null
      }
    }
  
    static insert(GivenUserId, ReceiptUserId) {
      var FollowId = helpers.insertRow(
        'INSERT INTO Follow (GivenUserId, ReceiptUserId) VALUES (?, ?)',
        [GivenUserId, ReceiptUserId]
      )
      console.log(FollowId)
      return FollowId
    }
  
    constructor(databaseRow) {
      this.GivenUserId = databaseRow.GivenUserId
      this.ReceiptUserId = databaseRow.ReceiptUserId
    }
  }

  module.exports = Follow