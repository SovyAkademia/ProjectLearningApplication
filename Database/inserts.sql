use sovylearn;
start transaction;

insert into students(Firstname, Lastname, Email, Password, year) values ('Janko', 'Mrkva','mrkva@salat.sk','$2b$10$YpYOD.zeP7T8W1t5ZTailuDP6LiKtOE0w/JgRyfB63E.B1hoKPDTC', 2000);
insert into students(Firstname, Lastname, Email, Password, year) values ('Evka', 'Hruska','hruska@salat.sk','$2b$10$YpYOD.zeP7T8W1t5ZTailuDP6LiKtOE0w/JgRyfB63E.B1hoKPDTC', 2000);
insert into students(Firstname, Lastname, Email, Password, year) values ('abc', 'cde','abc@cde.sk','$2b$10$xwktZI1GwKYiDWxmcBCWFOB/7wLnnSj1xxqlPkrWc8UCqBgFkY93G', 2000);
insert into students(Firstname, Lastname, Email, Password, year) values ('123', '456','123@test.sk','$2b$10$xwktZI1GwKYiDWxmcBCWFOB/7wLnnSj1xxqlPkrWc8UCqBgFkY93G', 2000);

insert into categories(CategoryName) values ('JavaScript');
insert into categories(CategoryName) values ('SQL');
insert into categories(CategoryName) values ('C');
insert into categories(CategoryName) values ('Python');
insert into categories(CategoryName) values ('Linux');
commit;




update teachers set Password = '$2b$10$xwktZI1GwKYiDWxmcBCWFOB/7wLnnSj1xxqlPkrWc8UCqBgFkY93G' where id = 1;




start transaction;
INSERT INTO `tests` (`ID`, `TestName`, `CategoryID`, `TeacherID`, `Allowed`, `Time`) VALUES
(3, 'Test test', 1, 1, 1, NULL),
(4, 'Best test', 2, 1, 1, NULL),
(5, 'Get Rest', 2, 1, 1, NULL),
(6, 'West', 2, 1, 1, NULL);
commit;

start transaction;
INSERT INTO `test_details` (`ID`, `TestID`, `QuestionID`) VALUES
(8, 3, 1),
(9, 3, 2),
(10, 3, 3),
(11, 4, 4),
(12, 4, 5),
(13, 3, 6),
(14, 3, 5),
(15, 4, 5),
(16, 4, 4),
(17, 4, 3),
(18, 4, 2),
(19, 4, 1),
(20, 5, 5),
(21, 5, 4),
(22, 5, 3),
(23, 5, 2),
(24, 5, 1),
(25, 6, 5),
(26, 6, 4),
(27, 6, 3),
(28, 6, 2),
(29, 6, 1);




commit;
