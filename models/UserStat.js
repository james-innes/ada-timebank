
var { db, helpers } = require('../database')

class UserStat {
  static get(CurrentUserId) {
    return helpers.getRow(`
    SELECT SumHour,
    AvgHour,
    CountDeed
      FROM
        (SELECT User.*,

          (SELECT sum(Deed.DurationHour)
          FROM Deed
          WHERE Deed.UserId = User.UserId ) SumHour,

          (SELECT round(avg(Deed.DurationHour))
          FROM Deed
          WHERE Deed.UserId = User.UserId ) AvgHour,

          (SELECT count(Deed.DurationHour)
          FROM Deed
          WHERE Deed.UserId = User.UserId ) CountDeed

        FROM USER)
        WHERE (UserId = ?)
    `, [CurrentUserId])
  }
}

module.exports = UserStat

