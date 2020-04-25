SELECT * FROM Follow

DELETE FROM User WHERE User.UserId = 2

INSERT INTO Follow (GivenUserId, ReceiptUserId) VALUES (3, 5)

INSERT INTO Follow (GivenUserId, ReceiptUserId) VALUES (?, ?)'

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
) WHERE (UserId != 3) AND 

(UserId NOT IN (
	SELECT ReceiptUserId
	FROM Follow
	WHERE Follow.GivenUserId = 3
	)
)

