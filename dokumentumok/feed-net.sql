-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Ápr 11. 12:23
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

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
(41, 1, 1, 4, 'undefined', '2022-04-01 13:33:41');

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
  `Leiras` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Tipus` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `Wifi` int(11) NOT NULL,
  `Statusz` tinyint(1) NOT NULL,
  `Kep` varchar(100) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Weboldal` varchar(100) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Facebook` varchar(100) COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `ettermek`
--

INSERT INTO `ettermek` (`ID`, `Email`, `Nev`, `Telefon`, `Parkolo`, `Bankkartya`, `Glutenmentes`, `Terasz`, `Berelheto`, `Cim`, `Ferohely`, `Hazhozszallitas`, `Leiras`, `Tipus`, `Wifi`, `Statusz`, `Kep`, `Weboldal`, `Facebook`) VALUES
(1, 'etterem1@gmail.com', 'Étterem1', '+36793556834', 1, 0, 0, 1, 0, '6500 Baja Ady Endre utca 300', 35, 0, 'Bajai Étterem', 'Magyar', 0, 1, 'img/rozsaetterem.jpg', NULL, NULL),
(2, 'etterem2@gmail.com', 'Étterem2', '+36793558862', 1, 1, 1, 1, 1, '6500 Baja Kovács Béla utca 23', 20, 1, 'Bajai étterem minden funkcióval', 'Japán', 1, 1, 'img/kedvencetterem.jpg', NULL, NULL),
(3, 'etterem3@gmail.com', 'Étterem3', '+36792556872', 0, 0, 0, 0, 0, '6500 Baja Kovács István utca 42', 20, 0, 'Bajai étterem semmilyen funkcióvall', 'Kínai', 0, 1, 'img/rozsaetterem.jpg', NULL, NULL);

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
,`Wifi` int(11)
,`Leiras` varchar(1000)
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
(1, 'admin@admin.hu', 'Admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', '', '0000-00-00 00:00:00', '2022-04-11 12:13:15', 1, 'admin'),
(2, 'felhasznalo@gmail.com', 'Felhasználó', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', '', '0000-00-00 00:00:00', '2022-04-01 09:22:28', 1, 'user'),
(3, 'etterem@gmail.com', 'Etterem', 'bc99c998efe316166f1aa6cefd571e4e01333b54', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 'etterem');

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
  `Tipus` varchar(10) COLLATE utf8_hungarian_ci NOT NULL,
  `Leiras` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

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
(3, 1, 1);

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
(10, 3, 'img/rozsaetterem.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `nyitvatartas`
--

CREATE TABLE `nyitvatartas` (
  `ID` int(11) NOT NULL,
  `Etterem_ID` int(11) NOT NULL,
  `Nap` varchar(10) COLLATE utf8_hungarian_ci NOT NULL,
  `Nyitas` time NOT NULL,
  `Zaras` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `nyitvatartas`
--

INSERT INTO `nyitvatartas` (`ID`, `Etterem_ID`, `Nap`, `Nyitas`, `Zaras`) VALUES
(1, 1, 'Hétfő', '09:00:00', '20:00:00'),
(2, 1, 'Kedd', '09:00:00', '20:00:00'),
(3, 1, 'Szerda', '09:00:00', '20:00:00'),
(4, 1, 'Csütörtök', '09:00:00', '20:00:00'),
(5, 1, 'Péntek', '09:00:00', '20:00:00'),
(6, 1, 'Szombat', '09:00:00', '20:00:00'),
(7, 1, 'Vasárnap', '09:00:00', '20:00:00'),
(8, 2, 'Hétfő', '09:00:00', '20:00:00');

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT a táblához `etlap`
--
ALTER TABLE `etlap`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `ettermek`
--
ALTER TABLE `ettermek`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `helyfoglalas`
--
ALTER TABLE `helyfoglalas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `hibajelentes`
--
ALTER TABLE `hibajelentes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `kedvenc`
--
ALTER TABLE `kedvenc`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `kepek`
--
ALTER TABLE `kepek`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `nyitvatartas`
--
ALTER TABLE `nyitvatartas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
