/*DATA SEEDER*/

/* Password: 'Password1!' Saltrounds: 10*/

/* All Users*/
INSERT INTO [User] VALUES (1, 'UserOne', 'UserOne@domain.com', '$2y$10$cvUvN2rekVzXaBFT71zNJusf9w2oR1hs5U.S0GKVnh7BWt2K.y5uu');
INSERT INTO [User] VALUES (2, 'UserTwo', 'UserTwo@domain.com', '$2y$10$1ZHh/uxHytJonofdYLPKDupVDXNKBebaYRAkSRpuDOTxFxt3X/PRK');
INSERT INTO [User] VALUES (3, 'UserThree', 'UserThree@domain.com', '$2y$10$n42yf02Sfr45vdGtGFBA9u8A86/UJQSXjm0Q0eG0FLErlj6Zymo.W');
INSERT INTO [User] VALUES (4, 'UserFour', 'UserFour@domain.com', '$2y$10$wWO1rner6LaWXmYktjxDKeUFa5w1jyJeOjiy3npu3rwqTHvtyAJAe');
INSERT INTO [User] VALUES (5, 'UserFive', 'UserFive@domain.com', '$2y$10$H3OW5iekqkd94k3KRJ/qk.JEdZh41Ritk6Xq6Xxxrw3VWwi0P1m62');

/* User One */
INSERT INTO Deed VALUES (11, 'Deed One for User One', '2018-01-05T05:05', 5, 1);
INSERT INTO Deed VALUES (12, 'Deed Two for User One', '2018-02-10T05:10', 10, 1);
INSERT INTO Deed VALUES (13, 'Deed Three for User One', '2018-03-15T08:15', 15, 1);

/* So that they have choice to make new follows
INSERT INTO Follow VALUES (1, 2);
INSERT INTO Follow VALUES (1, 3);
INSERT INTO Follow VALUES (1, 4);
INSERT INTO Follow VALUES (1, 5);
*/

/* UserTwo */
INSERT INTO Deed VALUES (21, 'Deed One for User Two', '2018-01-05T05:05', 5, 2);
INSERT INTO Deed VALUES (22, 'Deed Two for User Two', '2018-02-10T05:10', 10, 2);
INSERT INTO Deed VALUES (23, 'Deed Three for User Two', '2018-03-15T08:15', 15, 2);

INSERT INTO Follow VALUES (2, 1);
INSERT INTO Follow VALUES (2, 3);
INSERT INTO Follow VALUES (2, 4);
INSERT INTO Follow VALUES (2, 5);

/* User Three */
INSERT INTO Deed VALUES (31, 'Deed One for User Three', '2018-01-05T05:05', 5, 3);
INSERT INTO Deed VALUES (32, 'Deed Two for User Three', '2018-02-10T05:10', 10, 3);
INSERT INTO Deed VALUES (33, 'Deed Three for User Three', '2018-03-15T08:15', 15, 3);

INSERT INTO Follow VALUES (3, 1);
INSERT INTO Follow VALUES (3, 2);
INSERT INTO Follow VALUES (3, 4);
INSERT INTO Follow VALUES (3, 5);

/* User Four */
INSERT INTO Deed VALUES (41, 'Deed One for User Four', '2018-01-05T05:05', 5, 4);
INSERT INTO Deed VALUES (42, 'Deed Two for User Four', '2018-02-10T05:10', 10, 4);
INSERT INTO Deed VALUES (43, 'Deed Three for User Four', '2018-03-15T08:15', 15, 4);

INSERT INTO Follow VALUES (4, 1);
INSERT INTO Follow VALUES (4, 2);
INSERT INTO Follow VALUES (4, 3);
INSERT INTO Follow VALUES (4, 5);

/* User Five */
INSERT INTO Deed VALUES (51, 'Deed One for User Five', '2018-01-05T05:05', 5, 5);
INSERT INTO Deed VALUES (52, 'Deed Two for User Five', '2018-02-10T05:10', 10, 5);
INSERT INTO Deed VALUES (53, 'Deed Three for User Five', '2018-03-15T08:15', 15, 5);


INSERT INTO Follow VALUES (5, 1);
INSERT INTO Follow VALUES (5, 2);
INSERT INTO Follow VALUES (5, 3);
INSERT INTO Follow VALUES (5, 4);
