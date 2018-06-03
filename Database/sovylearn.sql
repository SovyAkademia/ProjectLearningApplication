-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: 127.0.0.1:3306
-- Čas generovania: Ne 03.Jún 2018, 15:20
-- Verzia serveru: 5.7.19
-- Verzia PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
DROP DATABASE IF EXISTS `sovylearn`;	+
CREATE SCHEMA IF NOT EXISTS `sovylearn` DEFAULT CHARACTER SET utf8;	
USE sovylearn;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáza: `sovylearn`
--

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `answers`
--

DROP TABLE IF EXISTS `answers`;
CREATE TABLE IF NOT EXISTS `answers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `QuestionID` int(11) NOT NULL,
  `AnswerText` varchar(255) NOT NULL,
  `Correct` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `questionID` (`QuestionID`)
) ENGINE=MyISAM AUTO_INCREMENT=229 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `answers`
--

INSERT INTO `answers` (`ID`, `QuestionID`, `AnswerText`, `Correct`) VALUES
(1, 1, 'Bold text', 1),
(2, 1, 'Italic text', 0),
(3, 1, 'Underlined text', 0),
(4, 1, 'Black colored text', 0),
(5, 2, 'HTML3', 0),
(6, 2, 'HTML4', 0),
(7, 2, 'HTML5', 1),
(8, 2, 'HTML6', 0),
(9, 3, 'Hibernate Markup Language', 0),
(10, 3, 'Hypertext Markup Language', 1),
(11, 3, 'Hypertext Markable Language', 0),
(12, 3, 'Hypertext Multiple Language', 0),
(13, 4, 'Server', 0),
(14, 4, 'GUI', 1),
(15, 4, 'Test applications', 0),
(16, 4, 'Database scripts', 0),
(17, 5, 'private int i==1;', 0),
(18, 5, 'private integer i=1;', 0),
(19, 5, 'private integer i==1;', 0),
(20, 5, 'private int i=1;', 1),
(21, 6, 'Lower letter', 0),
(22, 6, 'Upper letter', 1),
(23, 6, 'Special character', 0),
(24, 6, 'Number', 0);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `answers_view`
--

DROP TABLE IF EXISTS `answers_view`;
CREATE TABLE IF NOT EXISTS `answers_view` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `IDQuestion` int(11) DEFAULT NULL,
  `ans1` varchar(255) NOT NULL,
  `ans2` varchar(255) NOT NULL,
  `ans3` varchar(255) NOT NULL,
  `ans4` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDQuestion` (`IDQuestion`)
) ENGINE=MyISAM AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `answers_view`
--

INSERT INTO `answers_view` (`id`, `IDQuestion`, `ans1`, `ans2`, `ans3`, `ans4`) VALUES
(57, 2, 'HTML3', 'HTML4', 'HTML5', 'HTML6'),
(56, 1, 'Bold text', 'Italic text', 'Underlined text', 'Black colored text'),
(58, 3, 'Hibernate Markup Language', 'Hypertext Markup Language', 'Hypertext Markable Language', 'Hypertext Multiple Language'),
(59, 4, 'Server', 'GUI', 'Test applications', 'Database scripts'),
(60, 5, 'private int i==1;', 'private integer i=1;', 'private integer i==1;', 'private int i=1;'),
(61, 6, 'Lower letter', 'Upper letter', 'Special character', 'Number');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `categories`
--

INSERT INTO `categories` (`ID`, `CategoryName`) VALUES
(1, 'HTML'),
(2, 'Java');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `QuestionText` varchar(1000) DEFAULT NULL,
  `Points` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=57 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `questions`
--

INSERT INTO `questions` (`ID`, `QuestionText`, `Points`) VALUES
(1, 'What is \'b\' tag used for?', 3),
(2, 'Which version of HTML is the newest?', 1),
(3, 'HTML is...?', 2),
(4, 'JavaFX is used for creating of...?', 3),
(5, 'What is correct syntax for defining of integer?', 4),
(6, 'The name of class should start with...?', 5);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `results`
--

DROP TABLE IF EXISTS `results`;
CREATE TABLE IF NOT EXISTS `results` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `StudentID` int(11) NOT NULL,
  `TestID` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Score` float NOT NULL,
  `BeginTime` datetime NOT NULL,
  `EndTime` datetime NOT NULL,
  `OverallTime` time NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `StudentID` (`StudentID`),
  KEY `TestID` (`TestID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `result_details`
--

DROP TABLE IF EXISTS `result_details`;
CREATE TABLE IF NOT EXISTS `result_details` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ResultID` int(11) DEFAULT NULL,
  `QuestionID` int(11) DEFAULT NULL,
  `AnswerID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ResultID` (`ResultID`),
  KEY `QuestionID` (`QuestionID`),
  KEY `AnswerID` (`AnswerID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(30) NOT NULL,
  `LastName` varchar(30) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `DateOfReg` datetime DEFAULT NULL,
  `Year` int(4) NOT NULL,
  `Online` tinyint(1) NOT NULL DEFAULT '0',
  `Allowed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `students`
--

INSERT INTO `students` (`ID`, `FirstName`, `LastName`, `Email`, `Password`, `DateOfReg`, `Year`, `Online`, `Allowed`) VALUES
(33, 'Boris', 'Galický', 'boris.galicky@akademiasovy.sk', '$2a$10$HighjTVd20rQpdOvbchHHuOr1CDL8M10zWTBCfelyIVjc.1rhoCMy', '2018-06-02 19:08:41', 2017, 0, 1),
(29, 'Try', 'Student', 'try.student@gmail.com', '$2a$10$sxTfgOlNEqqJDZvJ3O7fZOL.TSDQgzdwPmSun/AkQF0wDZXiVUj72', '2018-05-31 12:25:48', 2017, 0, 0);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `students_history`
--

DROP TABLE IF EXISTS `students_history`;
CREATE TABLE IF NOT EXISTS `students_history` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `DateOfDelete` datetime DEFAULT NULL,
  `Year` int(4) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `teachers`
--

DROP TABLE IF EXISTS `teachers`;
CREATE TABLE IF NOT EXISTS `teachers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(30) NOT NULL,
  `LastName` varchar(30) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `DateOfReg` datetime DEFAULT NULL,
  `Online` tinyint(1) NOT NULL DEFAULT '0',
  `Allowed` tinyint(1) NOT NULL DEFAULT '0',
  `Admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `teachers`
--

INSERT INTO `teachers` (`ID`, `FirstName`, `LastName`, `Email`, `Password`, `DateOfReg`, `Online`, `Allowed`, `Admin`) VALUES
(1, 'Roland', 'Onofrej', 'roland.onofrej@akademiasovy.sk', '$2b$10$kn4QdSWj5jAjSFoa.OBGQuYxHN3GEES0ldfBL.dfUZdfZtpyanUKC', '2018-06-02 19:33:48', 0, 0, 0),
(2, 'John', 'Doe', 'john.doe@gmail.com', '$2b$10$vFpCeBjl22l2HMWi/zg3S.xe0RLEfZATggwpHV8KGXlJL6yIL5S/W', '2018-05-25 16:38:14', 0, 0, 0),
(9, 'First', 'Teacher', 'first.teacher@gmail.com', '$2b$10$Y1CJKsVU2T6fKqsw5C47p.UMuSsIyBYiQFgbYZf3eQIa0xYKRWCwS', '2018-06-02 19:22:29', 0, 0, 0),
(11, 'Second', 'Teacher', 'second.teacher@gmail.com', '$2b$10$Y1CJKsVU2T6fKqsw5C47p.UMuSsIyBYiQFgbYZf3eQIa0xYKRWCwS', '2018-06-02 19:22:29', 0, 0, 0),
(13, 'Admin', 'Teacher', 'admin.teacher@gmail.com', '$2b$10$SiaWZhvMpt3GmrJQPVMtsOFJQSHA5kTYKPsmSKMc0nLufElmag3o.', '2018-06-03 17:18:43', 0, 0, 1);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `teachers_history`
--

DROP TABLE IF EXISTS `teachers_history`;
CREATE TABLE IF NOT EXISTS `teachers_history` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `DateOfDelete` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `tests`
--

DROP TABLE IF EXISTS `tests`;
CREATE TABLE IF NOT EXISTS `tests` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TestName` varchar(255) DEFAULT NULL,
  `CategoryID` int(11) DEFAULT NULL,
  `TeacherID` int(11) DEFAULT NULL,
  `Allowed` tinyint(1) NOT NULL DEFAULT '0',
  `Activated` tinyint(1) NOT NULL DEFAULT '0',
  `Time` time DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `CategoryID` (`CategoryID`),
  KEY `TeacherID` (`TeacherID`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `tests`
--

INSERT INTO `tests` (`ID`, `TestName`, `CategoryID`, `TeacherID`, `Allowed`, `Activated`, `Time`) VALUES
(1, 'Big HTML test', 1, 1, 0, 0, NULL),
(2, 'Java test', 2, 2, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `test_details`
--

DROP TABLE IF EXISTS `test_details`;
CREATE TABLE IF NOT EXISTS `test_details` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TestID` int(11) NOT NULL,
  `QuestionID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `TestID` (`TestID`),
  KEY `QuestionID` (`QuestionID`)
) ENGINE=MyISAM AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `test_details`
--

INSERT INTO `test_details` (`ID`, `TestID`, `QuestionID`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 4),
(5, 2, 5),
(6, 2, 6);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
