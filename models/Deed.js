var { db, helpers } = require('../database')

class Deed {
    static findById(DeedId) {
      var row = helpers.getRow('SELECT * FROM Deed WHERE DeedId = ?', [DeedId])
  
      if (row) {
        return new Deed(row)
      } else {
        return null
      }
    }

    static update(DeedId, Title, StartTime, DurationHour) {
      return helpers.runAndExpectNoRows('UPDATE Deed SET Title = ?, StartTime = ?, DurationHour = ? WHERE DeedId = ?', [Title, StartTime, DurationHour, DeedId])
    }

    static delete(DeedId) {
      return helpers.runAndExpectNoRows('DELETE FROM Deed WHERE DeedId = ?', [DeedId])
    }

    static insert(Title, StartTime, DurationHour, CurrentUserId) {
      var DeedId = helpers.insertRow(
        'INSERT INTO Deed (Title, StartTime, DurationHour, UserId) VALUES (?, ?, ?, ?)',
        [Title, StartTime, DurationHour, CurrentUserId]
      )
      return DeedId
    }

    static selectDeedWhereCurrentUser(CurrentUserId) {
      return helpers.getRows('SELECT d.Title, d.StartTime, d.DurationHour, d.DeedId FROM Deed d WHERE UserId = ?', [CurrentUserId])
    }

    static selectUserWhereUserFollowReceiptUserId(CurrentUserId) {
      return helpers.getRows('SELECT Name FROM [User] WHERE UserId = (SELECT GivenUserId FROM Follow WHERE ReceiptUserId = ? )', [CurrentUserId])
    }

    static selectDeedWhereUserFollowGivenUserId(CurrentUserId) {
      return helpers.getRows('SELECT * FROM Deed WHERE UserId = (SELECT ReceiptUserId FROM Follow WHERE GivenUserId = ?) ORDER BY Deed.StartTime DESC', [CurrentUserId])
    }
  
    constructor(databaseRow) {
      this.DeedId = databaseRow.DeedId
      this.Title = databaseRow.Title
      this.StartTime = databaseRow.StartTime
      this.DurationHour = databaseRow.DurationHour
      this.UserId = databaseRow.UserId
    }
  }

  module.exports = Deed