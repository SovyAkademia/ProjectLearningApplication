-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: 127.0.0.1:3306
-- Čas generovania: Ne 06.Máj 2018, 15:10
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
  `Text` varchar(255) NOT NULL,
  `Correct` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`ID`),
  KEY `questionID` (`QuestionID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `answers`
--

INSERT INTO `answers` (`ID`, `QuestionID`, `Text`, `Correct`) VALUES
(1, 1, '2 times', b'1'),
(2, 1, '3 times', b'0');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `categories`
--

INSERT INTO `categories` (`ID`, `Name`) VALUES
(1, 'Java');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Text` text NOT NULL,
  `Points` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `questions`
--

INSERT INTO `questions` (`ID`, `Text`, `Points`) VALUES
(1, 'How many times will repetaed this loop?', 2),
(2, 'Is Java progamming language?', 1);

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
  `Year` int(4) NOT NULL,
  `Login` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `students`
--

INSERT INTO `students` (`ID`, `FirstName`, `LastName`, `Email`, `Password`, `Year`, `Login`) VALUES
(1, 'Erik', 'Ruszinka', 'erik.ruszinka@akademiasovy.sk', '1234', 2017, b'0');

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
  `Login` bit(1) NOT NULL DEFAULT b'0',
  `Admin` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `teachers`
--

INSERT INTO `teachers` (`ID`, `FirstName`, `LastName`, `Email`, `Password`, `Login`, `Admin`) VALUES
(1, 'Roland', 'Onofrej', 'roland.onofrej@akademiasovy.sk', '1234', b'0', b'1');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `temp_students`
--

DROP TABLE IF EXISTS `temp_students`;
CREATE TABLE IF NOT EXISTS `temp_students` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(30) NOT NULL,
  `LastName` varchar(30) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Year` year(4) NOT NULL,
  `Date` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `temp_students`
--

INSERT INTO `temp_students` (`ID`, `FirstName`, `LastName`, `Email`, `Password`, `Year`, `Date`) VALUES
(1, 'Boris', 'Galický', 'boris.galicky@akademiasovy.sk', '1234', 2017, NULL),
(2, 'Ondrej', 'Tomco', 'ondrej.tomco@akademiasovy.sk', '1234', 2017, NULL),
(3, 'Erik', 'Ruszinka', 'erik.ruszinka@akademiasovy.sk', '1234', 2017, NULL);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `temp_teachers`
--

DROP TABLE IF EXISTS `temp_teachers`;
CREATE TABLE IF NOT EXISTS `temp_teachers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(30) NOT NULL,
  `LastName` varchar(30) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Date` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `tests`
--

DROP TABLE IF EXISTS `tests`;
CREATE TABLE IF NOT EXISTS `tests` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `CategoryID` int(11) DEFAULT NULL,
  `TeacherID` int(11) DEFAULT NULL,
  `Allowed` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`ID`),
  KEY `CategoryID` (`CategoryID`),
  KEY `TeacherID` (`TeacherID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `tests`
--

INSERT INTO `tests` (`ID`, `Name`, `CategoryID`, `TeacherID`, `Allowed`) VALUES
(1, 'Loops', 1, 1, b'0');

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
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
