-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Feb 03. 13:24
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
-- Tábla szerkezet ehhez a táblához `felhasználók`
--

CREATE TABLE `felhasználók` (
  `ID` int(11) NOT NULL,
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
-- Tábla szerkezet ehhez a táblához `helyfoglalás`
--

CREATE TABLE `helyfoglalás` (
  `felhasználó_ID` int(11) NOT NULL,
  `étterem_ID` int(11) NOT NULL,
  `kezdés` datetime NOT NULL,
  `vége` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hibajelentés`
--

CREATE TABLE `hibajelentés` (
  `felhasználó_ID` int(11) NOT NULL,
  `étterem_ID` int(11) NOT NULL,
  `tipus` varchar(10) COLLATE utf8_hungarian_ci NOT NULL,
  `leírás` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kedvenc`
--

CREATE TABLE `kedvenc` (
  `Étterem_ID` int(11) NOT NULL,
  `Felhasználó_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `nyitvatartás`
--

CREATE TABLE `nyitvatartás` (
  `Étterem_ID` int(11) NOT NULL,
  `Nap` varchar(10) COLLATE utf8_hungarian_ci NOT NULL,
  `Nyitás` time NOT NULL,
  `Zárás` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `értékelés`
--

CREATE TABLE `értékelés` (
  `Étterem_ID` int(11) NOT NULL,
  `Felhasználó_ID` int(11) NOT NULL,
  `Pontszám` int(11) NOT NULL,
  `Étrékelés` mediumtext COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `étlap`
--

CREATE TABLE `étlap` (
  `Étterem_ID` int(11) NOT NULL,
  `Név` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `Ár` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `éttermek`
--

CREATE TABLE `éttermek` (
  `ID` int(11) NOT NULL,
  `Email` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Név` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Telefon` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `Parkoló` tinyint(1) NOT NULL,
  `Bankkártya` tinyint(1) NOT NULL,
  `Gluténmentes` tinyint(1) NOT NULL,
  `Terasz` tinyint(1) NOT NULL,
  `Bérelhető` tinyint(1) NOT NULL,
  `Cím` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `db` int(11) NOT NULL,
  `házhozszállítás` tinyint(1) NOT NULL,
  `leírás` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasználók`
--
ALTER TABLE `felhasználók`
  ADD PRIMARY KEY (`ID`);


--
-- A tábla indexei `helyfoglalás`
--
ALTER TABLE `helyfoglalás`
  ADD UNIQUE KEY `felhasználó_ID` (`felhasználó_ID`,`étterem_ID`),
  ADD KEY `étterem_ID` (`étterem_ID`);

--
-- A tábla indexei `hibajelentés`
--
ALTER TABLE `hibajelentés`
  ADD UNIQUE KEY `felhasználó_ID` (`felhasználó_ID`,`étterem_ID`),
  ADD KEY `étterem_ID` (`étterem_ID`);


--
-- A tábla indexei `helyfoglalás`
--
ALTER TABLE `helyfoglalás`
  ADD UNIQUE KEY `felhasználó_ID` (`felhasználó_ID`,`étterem_ID`),
  ADD KEY `étterem_ID` (`étterem_ID`);

--
-- A tábla indexei `hibajelentés`
--
ALTER TABLE `hibajelentés`
  ADD UNIQUE KEY `felhasználó_ID` (`felhasználó_ID`,`étterem_ID`),
  ADD KEY `étterem_ID` (`étterem_ID`);

--
-- A tábla indexei `kedvenc`
--
ALTER TABLE `kedvenc`
  ADD UNIQUE KEY `Étterem_ID` (`Étterem_ID`,`Felhasználó_ID`),
  ADD KEY `Felhasználó_ID` (`Felhasználó_ID`);

--
-- A tábla indexei `nyitvatartás`
--
ALTER TABLE `nyitvatartás`
  ADD UNIQUE KEY `Étterem_ID` (`Étterem_ID`);

--
-- A tábla indexei `értékelés`
--
ALTER TABLE `értékelés`
  ADD UNIQUE KEY `Étterem_ID` (`Étterem_ID`,`Felhasználó_ID`),
  ADD KEY `Felhasználó_ID` (`Felhasználó_ID`);

--
-- A tábla indexei `étlap`
--
ALTER TABLE `étlap`
  ADD UNIQUE KEY `Étterem_ID` (`Étterem_ID`);

--
-- A tábla indexei `éttermek`
--
ALTER TABLE `éttermek`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `felhasználók`
--
ALTER TABLE `felhasználók`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `éttermek`
--
ALTER TABLE `éttermek`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `helyfoglalás`
--
ALTER TABLE `helyfoglalás`
  ADD CONSTRAINT `helyfoglalás_ibfk_1` FOREIGN KEY (`felhasználó_ID`) REFERENCES `felhasználók` (`ID`),
  ADD CONSTRAINT `helyfoglalás_ibfk_2` FOREIGN KEY (`étterem_ID`) REFERENCES `éttermek` (`ID`);

--
-- Megkötések a táblához `hibajelentés`
--
ALTER TABLE `hibajelentés`
  ADD CONSTRAINT `hibajelentés_ibfk_1` FOREIGN KEY (`felhasználó_ID`) REFERENCES `felhasználók` (`ID`),
  ADD CONSTRAINT `hibajelentés_ibfk_2` FOREIGN KEY (`étterem_ID`) REFERENCES `éttermek` (`ID`);

--
-- Megkötések a táblához `kedvenc`
--
ALTER TABLE `kedvenc`
  ADD CONSTRAINT `kedvenc_ibfk_1` FOREIGN KEY (`Étterem_ID`) REFERENCES `éttermek` (`ID`),
  ADD CONSTRAINT `kedvenc_ibfk_2` FOREIGN KEY (`Felhasználó_ID`) REFERENCES `felhasználók` (`ID`);

--
-- Megkötések a táblához `nyitvatartás`
--
ALTER TABLE `nyitvatartás`
  ADD CONSTRAINT `nyitvatartás_ibfk_1` FOREIGN KEY (`Étterem_ID`) REFERENCES `éttermek` (`ID`);

--
-- Megkötések a táblához `értékelés`
--
ALTER TABLE `értékelés`
  ADD CONSTRAINT `értékelés_ibfk_1` FOREIGN KEY (`Étterem_ID`) REFERENCES `éttermek` (`ID`),
  ADD CONSTRAINT `értékelés_ibfk_2` FOREIGN KEY (`Felhasználó_ID`) REFERENCES `felhasználók` (`ID`);

--
-- Megkötések a táblához `étlap`
--
ALTER TABLE `étlap`
  ADD CONSTRAINT `étlap_ibfk_1` FOREIGN KEY (`Étterem_ID`) REFERENCES `éttermek` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
