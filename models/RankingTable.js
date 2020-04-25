var { db, helpers } = require('../database')

class RankingTable {
    static select(CurrentUserId) {
        return helpers.getRows(`
        SELECT UserId, Name, SumHour, AvgHour, CountDeed
        FROM (
            SELECT User.*,
            (
            SELECT sum(Deed.DurationHour)
            FROM Deed WHERE Deed.UserId = User.UserId
            ) SumHour,
            (
            SELECT round(avg(Deed.DurationHour), 2)
            FROM Deed WHERE Deed.UserId = User.UserId
            ) AvgHour,
            (
            SELECT count(Deed.DurationHour)
            FROM Deed WHERE Deed.UserId = User.UserId
            ) CountDeed
        
            FROM User
            ORDER BY SumHour, CountDeed DESC
            LIMIT 50
        ) WHERE (UserId != ?) AND 
        
        (UserId NOT IN (
            SELECT ReceiptUserId
            FROM Follow
            WHERE Follow.GivenUserId = ?
            )
        )
        `, [CurrentUserId, CurrentUserId])
    }
  }

  module.exports = RankingTable