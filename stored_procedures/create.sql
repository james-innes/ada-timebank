/*CREATE*/

CREATE TABLE [User] (
    UserId INTEGER PRIMARY KEY,
    [Name] TEXT NOT NULL,
    Email CHAR(50) NOT NULL UNIQUE,
    PasswordHash TEXT NOT NULL
);

CREATE TABLE Deed (
    DeedId INTEGER PRIMARY KEY,
    Title TEXT NOT NULL,
    StartTime DATETIME NOT NULL,
    DurationHour INTEGER NOT NULL,
    UserId INTEGER NOT NULL,
	CONSTRAINT UserId
	FOREIGN KEY([UserId]) REFERENCES [User](UserId)
	ON DELETE CASCADE
);

CREATE TABLE Follow (
    GivenUserId INTEGER NOT NULL,
    ReceiptUserId INTEGER NOT NULL,
    FOREIGN KEY (GivenUserId) REFERENCES [User](UserId) ON DELETE CASCADE,
    FOREIGN KEY (ReceiptUserId) REFERENCES [User](UserId) ON DELETE CASCADE,
    PRIMARY KEY (GivenUserId, ReceiptUserId)
);