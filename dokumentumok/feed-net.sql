-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Jan 23. 13:47
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

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasználók`
--

CREATE TABLE `felhasználók` (
  `Email` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Név` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Jelszó` text COLLATE utf8_hungarian_ci NOT NULL,
  `Regisztráció` date NOT NULL,
  `Belépés` date NOT NULL,
  `Státusz` tinyint(1) NOT NULL,
  `Jog` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kedvenc`
--

CREATE TABLE `kedvenc` (
  `Étterem_Email` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Felhasználó_Email` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `nyitvatartás`
--

CREATE TABLE `nyitvatartás` (
  `Email` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `Nap` varchar(10) COLLATE utf8_hungarian_ci NOT NULL,
  `Nyitás` time NOT NULL,
  `Zárás` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `értékelés`
--

CREATE TABLE `értékelés` (
  `Étterem_Email` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Felhasználó_Email` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Pontszám` int(11) NOT NULL,
  `Étrékelés` mediumtext COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `étlap`
--

CREATE TABLE `étlap` (
  `Étterem_Email` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `Név` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `Ár` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `éttermek`
--

CREATE TABLE `éttermek` (
  `Email` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Név` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Telefon` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Parkoló` tinyint(1) NOT NULL,
  `Bankkártya` tinyint(1) NOT NULL,
  `Gluténmentes` tinyint(1) NOT NULL,
  `Terasz` tinyint(1) NOT NULL,
  `Bérelhető` tinyint(1) NOT NULL,
  `Cím` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasználók`
--
ALTER TABLE `felhasználók`
  ADD PRIMARY KEY (`Email`);

--
-- A tábla indexei `kedvenc`
--
ALTER TABLE `kedvenc`
  ADD KEY `Étterem_Email` (`Étterem_Email`),
  ADD KEY `Felhasználó_Email` (`Felhasználó_Email`);

--
-- A tábla indexei `nyitvatartás`
--
ALTER TABLE `nyitvatartás`
  ADD UNIQUE KEY `Email` (`Email`);

--
-- A tábla indexei `értékelés`
--
ALTER TABLE `értékelés`
  ADD UNIQUE KEY `Étterem_Email` (`Étterem_Email`),
  ADD UNIQUE KEY `Felhasználó_Email` (`Felhasználó_Email`);

--
-- A tábla indexei `étlap`
--
ALTER TABLE `étlap`
  ADD KEY `Email` (`Étterem_Email`);

--
-- A tábla indexei `éttermek`
--
ALTER TABLE `éttermek`
  ADD PRIMARY KEY (`Email`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `kedvenc`
--
ALTER TABLE `kedvenc`
  ADD CONSTRAINT `kedvenc_ibfk_1` FOREIGN KEY (`Étterem_Email`) REFERENCES `éttermek` (`Email`),
  ADD CONSTRAINT `kedvenc_ibfk_2` FOREIGN KEY (`Felhasználó_Email`) REFERENCES `felhasználók` (`Email`);

--
-- Megkötések a táblához `nyitvatartás`
--
ALTER TABLE `nyitvatartás`
  ADD CONSTRAINT `nyitvatartás_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `éttermek` (`Email`);

--
-- Megkötések a táblához `értékelés`
--
ALTER TABLE `értékelés`
  ADD CONSTRAINT `értékelés_ibfk_1` FOREIGN KEY (`Étterem_Email`) REFERENCES `éttermek` (`Email`),
  ADD CONSTRAINT `értékelés_ibfk_2` FOREIGN KEY (`Felhasználó_Email`) REFERENCES `felhasználók` (`Email`);

--
-- Megkötések a táblához `étlap`
--
ALTER TABLE `étlap`
  ADD CONSTRAINT `étlap_ibfk_1` FOREIGN KEY (`Étterem_Email`) REFERENCES `éttermek` (`Email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
