var { db, helpers } = require('../database')

class User {
  static insert(Name, Email, PasswordHash) {
    var UserId = helpers.insertRow(
      'INSERT INTO User (Name, Email, PasswordHash) VALUES (?, ?, ?)',
      [Name, Email, PasswordHash]
    )
    return UserId
  }

  static delete(CurrentUserId) {
    return helpers.deleteRow('DELETE FROM User WHERE UserId = ?', [CurrentUserId])
  }

  static follow(CurrentUserId, ReceiptUserId) {
    return helpers.runAndExpectNoRows('INSERT INTO Follow VALUES ?, ?', [CurrentUserId, ReceiptUserId])
  }

  static findById(UserId) {
    var row = helpers.getRow('SELECT * FROM User WHERE UserId = ?', [UserId])
    if (row) {
      return new User(row)
    } else {
      return null
    }
  }

  static findByEmail(Email) {
    var row = helpers.getRow('SELECT * FROM User WHERE Email = ?', [Email])
    if (row) {
      return new User(row)
    } else {
      return null
    }
  }

  static selectUserFollowGivenUserId(CurrentUserId) {
    return helpers.getRows('SELECT Name FROM [User] WHERE UserId = (SELECT ReceiptUserId FROM Follow WHERE GivenUserId = ? )', [CurrentUserId])
  }

  static selectAllButCurrentUser(CurrentUserId) {
    return helpers.getRows('SELECT Name, UserId FROM [User] WHERE UserId != ?', [CurrentUserId])
  }

  static selectUserFollowReceipt(CurrentUserId) {
    return helpers.getRows(`SELECT u.Name FROM User u
    INNER JOIN Follow f ON f.GivenUserId = u.UserId
    WHERE f.ReceiptUserId = ?`, [CurrentUserId])
  }
 
  constructor(databaseRow) {
    this.UserId = databaseRow.UserId
    this.Name = databaseRow.Name
    this.Email = databaseRow.Email
    this.PasswordHash = databaseRow.PasswordHash
  }
}

module.exports = User
