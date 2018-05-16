-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: 127.0.0.1:3306
-- Čas generovania: St 16.Máj 2018, 11:10
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

DROP TABLE IF EXISTS `answers`;
CREATE TABLE IF NOT EXISTS `answers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `QuestionID` int(11) NOT NULL,
  `AnswerText` varchar(255) NOT NULL,
  `Correct` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `questionID` (`QuestionID`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `answers`
--

INSERT INTO `answers` (`ID`, `QuestionID`, `AnswerText`, `Correct`) VALUES
(4, 4, 'HTML5', 1),
(3, 3, 'Hardware device', 0),
(5, 5, '<i>', 0),
(6, 5, '<b>', 1),
(7, 3, 'Programming Language', 1),
(8, 4, 'HTML4', 0);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `categories`
--

INSERT INTO `categories` (`ID`, `CategoryName`) VALUES
(2, 'Java'),
(3, 'HTML');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `QuestionText` text NOT NULL,
  `Points` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `questions`
--

INSERT INTO `questions` (`ID`, `QuestionText`, `Points`) VALUES
(4, 'What is the newest version of HTML?', 5),
(3, 'What is Java?', 1),
(5, 'Which tag is used for bold text?', 3);

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
  `DateOfReg` date DEFAULT NULL,
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
  `DateOfReg` date DEFAULT NULL,
  `Online` tinyint(1) NOT NULL DEFAULT '0',
  `Allowed` tinyint(1) NOT NULL DEFAULT '0',
  `Admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `teachers`
--

INSERT INTO `teachers` (`ID`, `FirstName`, `LastName`, `Email`, `Password`, `DateOfReg`, `Online`, `Allowed`, `Admin`) VALUES
(3, 'Boris', 'Galický', 'boris@gmail.com', '$2b$10$YpYOD.zeP7T8W1t5ZTailuDP6LiKtOE0w/JgRyfB63E.B1hoKPDTC', '2018-05-15', 0, 0, 0);

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
  PRIMARY KEY (`ID`),
  KEY `CategoryID` (`CategoryID`),
  KEY `TeacherID` (`TeacherID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `tests`
--

INSERT INTO `tests` (`ID`, `TestName`, `CategoryID`, `TeacherID`, `Allowed`, `Time`) VALUES
(2, 'Java knowledge test', 2, 3, 0, NULL),
(3, 'Big HTML test', 3, 3, 0, NULL);

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
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `test_details`
--

INSERT INTO `test_details` (`ID`, `TestID`, `QuestionID`) VALUES
(1, 2, 3),
(2, 3, 4),
(3, 3, 5);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
