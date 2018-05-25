-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: 127.0.0.1:3306
-- Čas generovania: St 23.Máj 2018, 09:32
-- Verzia serveru: 5.7.19
-- Verzia PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


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

DROP DATABASE IF EXISTS `sovylearn`;
CREATE SCHEMA IF NOT EXISTS `sovylearn` DEFAULT CHARACTER SET utf8;
USE sovylearn;

DROP TABLE IF EXISTS `answers`;
CREATE TABLE IF NOT EXISTS `answers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `QuestionID` int(11) NOT NULL,
  `AnswerText` varchar(255) NOT NULL,
  `Correct` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `questionID` (`QuestionID`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

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
(23, 6, 'Number', 0),
(24, 6, 'Special character', 0);

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
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

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
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `questions`
--

INSERT INTO `questions` (`ID`, `QuestionText`, `Points`) VALUES
(1, 'What is <b> tag used for?', 3),
(2, 'Which version of HTML is the newest?', 1),
(3, 'HTML is...?', 2),
(4, 'JavaFX is used for creating of...?', 3),
(5, 'What is correct syntax for defining of integer?', 2),
(6, 'The name of class should start with...?', 1);

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
  `Time` time NOT NULL,
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
  `Password` varchar(255) NOT NULL,
  `DateOfReg` datetime DEFAULT NULL,
  `Year` int(4) NOT NULL,
  `Online` tinyint(1) NOT NULL DEFAULT '0',
  `Allowed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `teachers`
--

INSERT INTO `teachers` (`ID`, `FirstName`, `LastName`, `Email`, `Password`, `DateOfReg`, `Online`, `Allowed`, `Admin`) VALUES
(1, 'Roland', 'Onofrej', 'roland.onofrej@akademiasovy.sk', '$2b$10$wY52SZgiYCuAedhlF89MmOwoHoaUbDYol965mHMqep83efz766iG.', '2018-05-18 00:00:00', 0, 0, 0);

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
  `Time` time DEFAULT NULL,
  `CountOfQuestions` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `CategoryID` (`CategoryID`),
  KEY `TeacherID` (`TeacherID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `tests`
--

INSERT INTO `tests` (`ID`, `TestName`, `CategoryID`, `TeacherID`, `Allowed`, `Time`,`CountOfQuestions`) VALUES
(1, 'Big HTML test', 1, 1, 0, NULL,3),
(2, 'Java test', 2, 1, 0, NULL,3);

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
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

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
