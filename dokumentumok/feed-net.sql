-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Ápr 27. 22:30
-- Kiszolgáló verziója: 10.4.17-MariaDB
-- PHP verzió: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `feed-net`
--

DELIMITER $$
--
-- Eljárások
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `isopened` ()  BEGIN
DECLARE n INT DEFAULT 0;
DECLARE i INT DEFAULT 0;
DECLARE Nyitas TIME ;
DECLARE Zaras TIME;
DECLARE ID INT DEFAULT 0;
SELECT COUNT(*) FROM ettermek INTO n;
SET i=1;
WHILE i<n+1 DO 
   SELECT nyitvatartas.Nyitas FROM `nyitvatartas`,ettermek WHERE nyitvatartas.Etterem_ID=i AND ettermek.ID=i AND DAYOFWEEK(CURRENT_TIMESTAMP)=nyitvatartas.napid INTO Nyitas;

 SELECT nyitvatartas.Zaras  FROM `nyitvatartas`,ettermek WHERE nyitvatartas.Etterem_ID=i AND ettermek.ID=i AND DAYOFWEEK(CURRENT_TIMESTAMP)=nyitvatartas.napid INTO Zaras;

SET ID=i;


  
 CALL isopenedupdate(Nyitas,Zaras,ID);
  
  SET i = i + 1;

END WHILE;
 
End$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `isopenedupdate` (IN `Nyitas` DATETIME, IN `Zaras` DATETIME, IN `EtteremID` INT(11))  BEGIN
UPDATE `ettermek` SET `nyitvavane`=IF(Zaras>CURRENT_TIME AND Nyitas<CURRENT_TIME,1,0)  WHERE ID=EtteremID;
End$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ertekeles`
--

CREATE TABLE `ertekeles` (
  `ID` int(11) NOT NULL,
  `Etterem_ID` int(11) NOT NULL,
  `Felhasznalo_ID` int(11) NOT NULL,
  `Pontszam` int(11) NOT NULL,
  `Ertekeles` mediumtext COLLATE utf8_hungarian_ci NOT NULL,
  `Datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `ertekeles`
--

INSERT INTO `ertekeles` (`ID`, `Etterem_ID`, `Felhasznalo_ID`, `Pontszam`, `Ertekeles`, `Datum`) VALUES
(1, 1, 2, 5, 'Finom volt az étel amit szolgáltak.', '2022-03-16 20:53:55'),
(2, 2, 2, 4, 'Finom volt az étel amit szolgáltak.', '2022-03-16 20:53:55'),
(3, 3, 2, 3, 'Finom volt az étel amit szolgáltak.', '2022-03-16 20:53:55'),
(4, 1, 2, 4, 'Finom volt az étel.', '2022-03-16 21:01:34'),
(5, 2, 2, 2, 'Az étel miatt.', '2022-03-16 21:11:59'),
(6, 2, 2, 4, 'Finom volt az étel.', '2022-03-16 21:13:41'),
(41, 1, 1, 4, '', '2022-04-16 13:18:27'),
(44, 4, 1, 5, '', '2022-04-27 20:14:52'),
(45, 4, 2, 5, 'Finom ételt szolgáltak', '2022-04-27 21:07:39'),
(48, 5, 1, 5, '', '2022-04-27 21:51:43');

-- --------------------------------------------------------

--
-- A nézet helyettes szerkezete `ertekelesek`
-- (Lásd alább az aktuális nézetet)
--
CREATE TABLE `ertekelesek` (
`Nev` varchar(1000)
,`Felhasznalo_ID` int(11)
,`Etterem_ID` int(11)
,`Datum` datetime
,`Pontszam` int(11)
,`Ertekeles` mediumtext
,`Ertekeles_ID` int(11)
);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `etlap`
--

CREATE TABLE `etlap` (
  `ID` int(11) NOT NULL,
  `Etterem_ID` int(11) NOT NULL,
  `Nev` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `Ar` int(11) NOT NULL,
  `Leiras` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `etlap`
--

INSERT INTO `etlap` (`ID`, `Etterem_ID`, `Nev`, `Ar`, `Leiras`) VALUES
(1, 1, 'Sült Tarja', 1300, 'Frissen sült Tarja'),
(2, 1, 'Eper Torta', 2300, 'Eperrel megszort zselatin torta'),
(3, 2, 'Sör', 450, '3 deciliteres árpa sör'),
(4, 2, 'félédes bor', 900, 'fél literes félédes bor');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ettermek`
--

CREATE TABLE `ettermek` (
  `ID` int(11) NOT NULL,
  `Email` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Nev` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Telefon` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Parkolo` tinyint(1) NOT NULL,
  `Bankkartya` tinyint(1) NOT NULL,
  `Glutenmentes` tinyint(1) NOT NULL,
  `Terasz` tinyint(1) NOT NULL,
  `Berelheto` tinyint(1) NOT NULL,
  `Cim` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Ferohely` int(11) NOT NULL,
  `Hazhozszallitas` tinyint(1) NOT NULL,
  `Leiras` text COLLATE utf8_hungarian_ci NOT NULL,
  `Tipus` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `Wifi` tinyint(4) NOT NULL,
  `Statusz` tinyint(1) NOT NULL,
  `Kep` varchar(100) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Weboldal` varchar(100) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Facebook` varchar(100) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `nyitvavane` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `ettermek`
--

INSERT INTO `ettermek` (`ID`, `Email`, `Nev`, `Telefon`, `Parkolo`, `Bankkartya`, `Glutenmentes`, `Terasz`, `Berelheto`, `Cim`, `Ferohely`, `Hazhozszallitas`, `Leiras`, `Tipus`, `Wifi`, `Statusz`, `Kep`, `Weboldal`, `Facebook`, `nyitvavane`) VALUES
(1, 'etterem1@gmail.com', 'Étterem1', '+36793556834', 1, 0, 0, 1, 0, '6500 Baja Ady Endre utca 300', 35, 0, 'Bajai Étterem', 'Magyar', 0, 0, 'img/rozsaetterem.jpg', NULL, NULL, 0),
(2, 'etterem2@gmail.com', 'Étterem2', '+36793558862', 1, 1, 1, 1, 1, '6500 Baja Kovács Béla utca 23', 20, 1, 'Bajai étterem minden funkcióval', 'Japán', 1, 0, 'img/kedvencetterem.jpg', NULL, NULL, 0),
(3, 'etterem3@gmail.com', 'Étterem3', '+36792556872', 0, 0, 0, 0, 0, '6500 Baja Kovács István utca 42', 20, 1, 'Bajai étterem semmilyen funkcióvall', 'Kínai', 1, 0, 'img/rozsaetterem.jpg', NULL, NULL, 0),
(4, 'tanyacsardabaja@freemail.hu', 'Dunaparti Tanyacsárda Étterem Baja', '+36 79 323 454_', 1, 1, 0, 1, 0, '6500 Baja, I. ker. Tanya 7.', 45, 0, 'A Dunaparti Tanyacsárda földrajzilag Észak-Bácska leglakottabb települése Baja mellett attól északra fekszik. Közvetlenül a Duna partján vele szemben a Gemenc déli határánál. Éttermünk ajánlata e három hatás ízvilágát és jellegzetességét igyekszik ötvözni. A már bevált és közkedvelt „házias” ízek és ételek mellett csapatunk bátran használja a modern konyha adta lehetőségeket az ételek tálalásában és elkészítésében. A minőségi alapanyagból – a Dunai hal, a Gemenci vad és a zöldségek melyek nagyrészt a híres bajai piacról kerülnek a konyhába – igyekszünk a legváltozatosabb és a\r\nlegközkedveltebb ételeket készíteni.\r\nHagyomány és megújulás!\r\nEzen ars poetica alapján sok régi ételt újragondolva és tálalva kínálunk.\r\nReméljük sikerül a régi-új felfedezésére és gasztronómiai kalandokra invitálni Önöket!', 'Magyar', 0, 1, 'img/dunapartiTanyacsardaBaja1.jpg', 'http://dunapartitanyacsarda.hu/', 'fb.com/tanyacsarda/', 1),
(5, 'malomclub@fibermail.hu', 'Malom Étterem & Bowling', '+36 30 616 4306', 1, 1, 0, 1, 1, '6500 Baja, Szegedi út 19.', 300, 0, 'Baja és környéke legújabb szórakoztató és rendezvényközpontja. Elegáns, hangulatos környezetben, igényesen berendezett 120 és 300 fős éttermi, 120 főt befogadó 4 sávos bowling - pizzázó, 100 fős emeleti részlegünkön ahol biliárd, csocsó és fallabda is található. Kisebb - nagyobb rendezvénytermekkel (20-300 főig), non-stop panzióval várjuk Kedves Vendégeinket! Családi - baráti társaságok, összejövetelek, előadások, esküvők, ballagások, szülinapi partik, üzleti és gálavacsorák, élőzenés estek, céges rendezvények, termékbemutatók, kiállítások teljes körű lebonyolítása igényes, kellemes környezetben a legkedvezőbb árakon!', 'Magyar', 1, 1, 'img/malomEtteremBaja5.jpg', 'http://www.malomclubbaja.hu', 'fb.com/malom.club/', 0);

-- --------------------------------------------------------

--
-- A nézet helyettes szerkezete `ettermek_ertekelesek`
-- (Lásd alább az aktuális nézetet)
--
CREATE TABLE `ettermek_ertekelesek` (
`ID` int(11)
,`Nev` varchar(1000)
,`Kep` varchar(100)
,`Ertekeles` decimal(34,1)
,`Parkolo` tinyint(1)
,`Bankkartya` tinyint(1)
,`Glutenmentes` tinyint(1)
,`Terasz` tinyint(1)
,`Berelheto` tinyint(1)
,`Hazhozszallitas` tinyint(1)
,`Wifi` tinyint(4)
,`Leiras` text
,`Statusz` tinyint(1)
);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `ID` int(11) NOT NULL,
  `Email` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Nev` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Jelszo` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `Telefon` varchar(20) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Regisztracio` datetime NOT NULL,
  `Belepes` datetime DEFAULT NULL,
  `Statusz` tinyint(1) NOT NULL,
  `Jog` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`ID`, `Email`, `Nev`, `Jelszo`, `Telefon`, `Regisztracio`, `Belepes`, `Statusz`, `Jog`) VALUES
(1, 'admin@admin.hu', 'Admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', '', '0000-00-00 00:00:00', '2022-04-27 22:12:50', 1, 'admin'),
(2, 'felhasznalo@gmail.com', 'Felhasználó', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', '', '0000-00-00 00:00:00', '2022-04-27 21:07:27', 1, 'user'),
(3, 'etterem@gmail.com', 'Etterem', 'bc99c998efe316166f1aa6cefd571e4e01333b54', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 'etterem'),
(5, 'tanyacsardabaja@freemail.hu', 'Dunaparti Tanyacsárda Étterem Baja', '73f6d8310155c0a0f5ea64237973990aea02a932', NULL, '2022-04-27 20:00:10', NULL, 1, 'etterem'),
(6, 'malomclub@fibermail.hu', 'Malom Étterem & Bowling', '73f6d8310155c0a0f5ea64237973990aea02a932', NULL, '2022-04-27 21:47:03', NULL, 1, 'etterem');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `helyfoglalas`
--

CREATE TABLE `helyfoglalas` (
  `ID` int(11) NOT NULL,
  `Felhasznalo_ID` int(11) NOT NULL,
  `Etterem_ID` int(11) NOT NULL,
  `Kezdes` datetime NOT NULL,
  `Fo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `helyfoglalas`
--

INSERT INTO `helyfoglalas` (`ID`, `Felhasznalo_ID`, `Etterem_ID`, `Kezdes`, `Fo`) VALUES
(1, 2, 1, '2022-04-05 11:58:20', 4),
(2, 1, 1, '2022-04-05 11:58:20', 10),
(3, 1, 2, '2022-04-05 11:58:20', 10);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hibajelentes`
--

CREATE TABLE `hibajelentes` (
  `ID` int(11) NOT NULL,
  `Felhasznalo_ID` int(11) NOT NULL,
  `Etterem_ID` int(11) NOT NULL,
  `Tipus` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `Leiras` varchar(1000) COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `hibajelentes`
--

INSERT INTO `hibajelentes` (`ID`, `Felhasznalo_ID`, `Etterem_ID`, `Tipus`, `Leiras`) VALUES
(8, 1, 1, 'rosszadatok', 'Rossz Adatok'),
(9, 2, 4, 'rosszadatok', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kedvenc`
--

CREATE TABLE `kedvenc` (
  `ID` int(11) NOT NULL,
  `Etterem_ID` int(11) NOT NULL,
  `Felhasznalo_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kedvenc`
--

INSERT INTO `kedvenc` (`ID`, `Etterem_ID`, `Felhasznalo_ID`) VALUES
(4, 1, 1),
(3, 2, 1),
(2, 3, 1),
(6, 4, 1),
(7, 5, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kepek`
--

CREATE TABLE `kepek` (
  `ID` int(11) NOT NULL,
  `Etterem_ID` int(11) NOT NULL,
  `Kepek` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kepek`
--

INSERT INTO `kepek` (`ID`, `Etterem_ID`, `Kepek`) VALUES
(1, 1, 'img/rozsaetterem.jpg'),
(2, 1, 'img/rozsaetterem.jpg'),
(3, 1, 'img/rozsaetterem.jpg'),
(4, 1, 'img/rozsaetterem.jpg'),
(5, 1, 'img/kedvencetterem.jpg'),
(6, 2, 'img/kedvencetterem.jpg'),
(7, 2, 'img/kedvencetterem.jpg'),
(8, 2, 'img/kedvencetterem.jpg'),
(9, 3, 'img/rozsaetterem.jpg'),
(10, 3, 'img/rozsaetterem.jpg'),
(11, 4, 'img/dunapartiTanyacsardaBaja1.jpg'),
(12, 4, 'img/dunapartiTanyacsardaBaja2.jpg'),
(13, 4, 'img/dunapartiTanyacsardaBaja3.jpg'),
(14, 4, 'img/dunapartiTanyacsardaBaja4.jpg'),
(15, 5, 'img/malomEtteremBaja1.jpg'),
(19, 5, 'img/malomEtteremBaja5.jpg'),
(20, 5, 'img/malomEtteremBaja6.jpg'),
(21, 5, 'img/malomEtteremBaja7.jpg'),
(22, 5, 'img/malomEtteremBaja8.jpg'),
(23, 5, 'img/malomEtteremBaja9.jpg'),
(24, 5, 'img/malomEtteremBaja10.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `nyitvatartas`
--

CREATE TABLE `nyitvatartas` (
  `ID` int(11) NOT NULL,
  `Etterem_ID` int(11) NOT NULL,
  `Nap` varchar(10) COLLATE utf8_hungarian_ci NOT NULL,
  `napid` int(11) NOT NULL,
  `Nyitas` time DEFAULT NULL,
  `Zaras` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `nyitvatartas`
--

INSERT INTO `nyitvatartas` (`ID`, `Etterem_ID`, `Nap`, `napid`, `Nyitas`, `Zaras`) VALUES
(1, 1, 'Hétfő', 2, '07:00:00', '15:00:00'),
(2, 1, 'Kedd', 3, '09:00:00', '20:00:00'),
(3, 1, 'Szerda', 4, '09:00:00', '12:00:00'),
(4, 1, 'Csütörtök', 5, '09:00:00', '20:00:00'),
(5, 1, 'Péntek', 6, '09:00:00', '20:00:00'),
(6, 1, 'Szombat', 7, '09:00:00', '23:00:00'),
(7, 1, 'Vasárnap', 1, '09:00:00', '20:00:00'),
(8, 2, 'Hétfő', 2, '09:00:00', '20:00:00'),
(9, 2, 'Kedd', 3, '08:00:00', '17:00:00'),
(10, 2, 'Szerda', 4, '08:00:00', '17:00:00'),
(11, 2, 'Csütörtök', 5, '08:00:00', '17:00:00'),
(12, 2, 'Péntek', 6, '08:00:00', '17:00:00'),
(13, 2, 'Szombat', 7, '08:00:00', '17:00:00'),
(14, 2, 'Vasárnap', 1, '08:00:00', '17:00:00'),
(15, 3, 'Hétfő', 2, '08:00:00', '19:00:00'),
(16, 3, 'Kedd', 3, '08:00:00', '17:00:00'),
(17, 3, 'Szerda', 4, '08:00:00', '17:00:00'),
(18, 3, 'Csütörtök', 5, '08:00:00', '17:00:00'),
(19, 3, 'Péntek', 6, '08:00:00', '17:00:00'),
(20, 3, 'Szombat', 7, '08:00:00', '17:00:00'),
(21, 3, 'Vasárnap', 1, '08:00:00', '17:00:00'),
(22, 4, 'Hétfő', 2, '12:00:00', '21:00:00'),
(23, 4, 'Kedd', 3, '12:00:00', '21:00:00'),
(24, 4, 'Szerda', 4, '12:00:00', '21:00:00'),
(25, 4, 'Csötörtök', 5, '12:00:00', '21:00:00'),
(26, 4, 'Péntek', 6, '12:00:00', '21:00:00'),
(27, 4, 'Szombat', 7, '12:00:00', '21:00:00'),
(28, 4, 'Vasárnap', 1, '12:00:00', '20:00:00'),
(29, 5, 'Hétfő', 2, '06:00:00', '22:00:00'),
(30, 5, 'Kedd', 3, '06:00:00', '22:00:00'),
(31, 5, 'Szerda', 4, '06:00:00', '22:00:00'),
(32, 5, 'Csötörtök', 5, '06:00:00', '22:00:00'),
(33, 5, 'Péntek', 6, '06:00:00', '22:00:00'),
(34, 5, 'Szombat', 7, '06:00:00', '23:00:00'),
(35, 5, 'Vasárnap', 1, '06:00:00', '22:00:00');

-- --------------------------------------------------------

--
-- Nézet szerkezete `ertekelesek`
--
DROP TABLE IF EXISTS `ertekelesek`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `ertekelesek`  AS SELECT `felhasznalok`.`Nev` AS `Nev`, `felhasznalok`.`ID` AS `Felhasznalo_ID`, `ettermek`.`ID` AS `Etterem_ID`, `ertekeles`.`Datum` AS `Datum`, `ertekeles`.`Pontszam` AS `Pontszam`, `ertekeles`.`Ertekeles` AS `Ertekeles`, `ertekeles`.`ID` AS `Ertekeles_ID` FROM ((`ertekeles` join `felhasznalok`) join `ettermek`) WHERE `ertekeles`.`Felhasznalo_ID` = `felhasznalok`.`ID` AND `ettermek`.`ID` = `ertekeles`.`Etterem_ID` ;

-- --------------------------------------------------------

--
-- Nézet szerkezete `ettermek_ertekelesek`
--
DROP TABLE IF EXISTS `ettermek_ertekelesek`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `ettermek_ertekelesek`  AS SELECT `ettermek`.`ID` AS `ID`, `ettermek`.`Nev` AS `Nev`, `ettermek`.`Kep` AS `Kep`, round(sum(`ertekeles`.`Pontszam`) / count(`ertekeles`.`Pontszam`),1) AS `Ertekeles`, `ettermek`.`Parkolo` AS `Parkolo`, `ettermek`.`Bankkartya` AS `Bankkartya`, `ettermek`.`Glutenmentes` AS `Glutenmentes`, `ettermek`.`Terasz` AS `Terasz`, `ettermek`.`Berelheto` AS `Berelheto`, `ettermek`.`Hazhozszallitas` AS `Hazhozszallitas`, `ettermek`.`Wifi` AS `Wifi`, `ettermek`.`Leiras` AS `Leiras`, `ettermek`.`Statusz` AS `Statusz` FROM (`ettermek` join `ertekeles`) WHERE `ettermek`.`ID` = `ertekeles`.`Etterem_ID` GROUP BY `ettermek`.`Nev` ;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `ertekeles`
--
ALTER TABLE `ertekeles`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Felhasznalo_ID` (`Felhasznalo_ID`),
  ADD KEY `Etterem_ID` (`Etterem_ID`,`Felhasznalo_ID`) USING BTREE;

--
-- A tábla indexei `etlap`
--
ALTER TABLE `etlap`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Etterem_ID` (`Etterem_ID`) USING BTREE;

--
-- A tábla indexei `ettermek`
--
ALTER TABLE `ettermek`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `helyfoglalas`
--
ALTER TABLE `helyfoglalas`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `etterem_ID` (`Etterem_ID`),
  ADD KEY `felhasznalo_ID` (`Felhasznalo_ID`,`Etterem_ID`) USING BTREE;

--
-- A tábla indexei `hibajelentes`
--
ALTER TABLE `hibajelentes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `etterem_ID` (`Etterem_ID`),
  ADD KEY `felhasznalo_ID` (`Felhasznalo_ID`,`Etterem_ID`) USING BTREE;

--
-- A tábla indexei `kedvenc`
--
ALTER TABLE `kedvenc`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Felhasznalo_ID` (`Felhasznalo_ID`),
  ADD KEY `Etterem_ID` (`Etterem_ID`,`Felhasznalo_ID`) USING BTREE;

--
-- A tábla indexei `kepek`
--
ALTER TABLE `kepek`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Etterem_ID` (`Etterem_ID`) USING BTREE;

--
-- A tábla indexei `nyitvatartas`
--
ALTER TABLE `nyitvatartas`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Etterem_ID` (`Etterem_ID`) USING BTREE;

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `ertekeles`
--
ALTER TABLE `ertekeles`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT a táblához `etlap`
--
ALTER TABLE `etlap`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `ettermek`
--
ALTER TABLE `ettermek`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `helyfoglalas`
--
ALTER TABLE `helyfoglalas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `hibajelentes`
--
ALTER TABLE `hibajelentes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `kedvenc`
--
ALTER TABLE `kedvenc`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `kepek`
--
ALTER TABLE `kepek`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT a táblához `nyitvatartas`
--
ALTER TABLE `nyitvatartas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `ertekeles`
--
ALTER TABLE `ertekeles`
  ADD CONSTRAINT `ertekeles_ibfk_1` FOREIGN KEY (`Etterem_ID`) REFERENCES `ettermek` (`ID`),
  ADD CONSTRAINT `ertekeles_ibfk_2` FOREIGN KEY (`Felhasznalo_ID`) REFERENCES `felhasznalok` (`ID`);

--
-- Megkötések a táblához `etlap`
--
ALTER TABLE `etlap`
  ADD CONSTRAINT `etlap_ibfk_1` FOREIGN KEY (`Etterem_ID`) REFERENCES `ettermek` (`ID`);

--
-- Megkötések a táblához `helyfoglalas`
--
ALTER TABLE `helyfoglalas`
  ADD CONSTRAINT `helyfoglalas_ibfk_1` FOREIGN KEY (`Felhasznalo_ID`) REFERENCES `felhasznalok` (`ID`),
  ADD CONSTRAINT `helyfoglalas_ibfk_2` FOREIGN KEY (`Etterem_ID`) REFERENCES `ettermek` (`ID`),
  ADD CONSTRAINT `helyfoglalas_ibfk_3` FOREIGN KEY (`Felhasznalo_ID`) REFERENCES `felhasznalok` (`ID`),
  ADD CONSTRAINT `helyfoglalas_ibfk_4` FOREIGN KEY (`Etterem_ID`) REFERENCES `ettermek` (`ID`);

--
-- Megkötések a táblához `hibajelentes`
--
ALTER TABLE `hibajelentes`
  ADD CONSTRAINT `hibajelentes_ibfk_1` FOREIGN KEY (`Felhasznalo_ID`) REFERENCES `felhasznalok` (`ID`),
  ADD CONSTRAINT `hibajelentes_ibfk_2` FOREIGN KEY (`Etterem_ID`) REFERENCES `ettermek` (`ID`),
  ADD CONSTRAINT `hibajelentes_ibfk_3` FOREIGN KEY (`Etterem_ID`) REFERENCES `ettermek` (`ID`),
  ADD CONSTRAINT `hibajelentes_ibfk_4` FOREIGN KEY (`Felhasznalo_ID`) REFERENCES `felhasznalok` (`ID`);

--
-- Megkötések a táblához `kedvenc`
--
ALTER TABLE `kedvenc`
  ADD CONSTRAINT `kedvenc_ibfk_1` FOREIGN KEY (`Etterem_ID`) REFERENCES `ettermek` (`ID`),
  ADD CONSTRAINT `kedvenc_ibfk_2` FOREIGN KEY (`Felhasznalo_ID`) REFERENCES `felhasznalok` (`ID`);

--
-- Megkötések a táblához `kepek`
--
ALTER TABLE `kepek`
  ADD CONSTRAINT `kepek_ibfk_1` FOREIGN KEY (`Etterem_ID`) REFERENCES `ettermek` (`ID`);

--
-- Megkötések a táblához `nyitvatartas`
--
ALTER TABLE `nyitvatartas`
  ADD CONSTRAINT `nyitvatartas_ibfk_1` FOREIGN KEY (`Etterem_ID`) REFERENCES `ettermek` (`ID`);

DELIMITER $$
--
-- Események
--
CREATE DEFINER=`root`@`localhost` EVENT `myevent` ON SCHEDULE EVERY 1 MINUTE STARTS '2022-04-16 21:24:42' ON COMPLETION NOT PRESERVE ENABLE DO CALL isopened()$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
