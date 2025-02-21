-- List all cars with their manufacturer details (INNER JOIN)
SELECT
    Samochod.SamochodID,
    Samochod.Marka,
    Samochod.Model,
    Samochod.Rocznik,
    Samochod.Cena,
    Producent.Nazwa AS Producent,
    Producent.Kraj
FROM Samochod
INNER JOIN Producent ON Samochod.ProducentID = Producent.ProducentID;

-- List all the cars related to transactions (INNER JOIN)
SELECT DISTINCT
    Samochod.VIN,
    Samochod.Marka,
    Samochod.Model
FROM Samochod
INNER JOIN Transakcja ON Samochod.SamochodID = Transakcja.SamochodID;

-- List all customers who were given a discount (INNER JOIN)
SELECT Klient.Imie, Klient.Nazwisko, Rabat.Kwota, Rabat.Procent, Rabat.Rodzaj
FROM Rabat
JOIN Klient ON Rabat.KlientID = Klient.KlientID;

-- List all options on a car with a specific ID (INNER JOIN)
SELECT Opcje.Nazwa, Opcje.Cena
FROM SamochodOpcje
JOIN Opcje on SamochodOpcje.OpcjaID = Opcje.OpcjaID
WHERE SamochodOpcje.SamochodID = :CarID;

-- Calculate total money saved by customers (INNER JOIN)
SELECT
    Klient.KlientID,
    Klient.Imie,
    Klient.Nazwisko,
    SUM(
        CASE
            WHEN Rabat.Rodzaj = 'Kwota' THEN Rabat.Kwota
            WHEN Rabat.Rodzaj = 'Procent' THEN Platnosc.Wartosc * Rabat.Procent / 100
        END
    ) AS OszczednosciLacznie
FROM Klient
JOIN Transakcja ON Transakcja.KlientID = Klient.KlientID
JOIN Rabat ON Rabat.TransakcjaID = Transakcja.TransakcjaID
JOIN Platnosc ON Platnosc.TransakcjaID = Transakcja.TransakcjaID
GROUP BY Klient.KlientID, Klient.Imie, Klient.Nazwisko;

-- List all the cars with their related transaction details (OUTER JOIN)
SELECT DISTINCT
    Transakcja.TransakcjaID,
    Samochod.SamochodID,
    Samochod.Marka,
    Samochod.Model,
    Samochod.VIN,
    Transakcja.Typ AS TypTransakcji,
    Platnosc.Wartosc,
    Transakcja.Data AS DataTransakcji
FROM Samochod
LEFT JOIN Transakcja ON Transakcja.SamochodID = Samochod.SamochodID
LEFT JOIN Platnosc ON Platnosc.TransakcjaID = Transakcja.TransakcjaID;

-- List the latest service date for each car (OUTER JOIN)
SELECT
    Samochod.SamochodID,
    Samochod.Marka,
    Samochod.Model,
    MAX(Serwis.Data) AS OstatniSerwis
FROM Samochod
LEFT JOIN SerwisZgloszenie ON Samochod.SamochodID = SerwisZgloszenie.SamochodID
LEFT JOIN Serwis ON SerwisZgloszenie.ZgloszenieID = Serwis.ZgloszenieID
GROUP BY Samochod.SamochodID, Samochod.Marka, Samochod.Model;

-- Count vehicles in stock per the manufacturer (GROUPING)
SELECT Producent.Nazwa AS Producent, COUNT(*) AS LiczbaSamochodow
FROM Samochod
JOIN Producent ON Samochod.ProducentID = Producent.ProducentID
GROUP BY Producent.Nazwa
ORDER BY LiczbaSamochodow DESC;

-- Find the TOP 5 salesmen with the highest transaction counts (SORTING)
SELECT
    Pracownik.PracownikID,
    Pracownik.Imie,
    Pracownik.Nazwisko,
    Pracownik.Stanowisko,
    Sprzedawca.IloscTransakcji
FROM Sprzedawca
JOIN Pracownik ON Pracownik.PracownikID = Sprzedawca.PracownikID
ORDER BY Sprzedawca.IloscTransakcji DESC
FETCH FIRST 5 ROWS ONLY;

-- Sort mechanics by the completed services (SORTING)
SELECT
    Pracownik.PracownikID,
    Pracownik.Imie,
    Pracownik.Nazwisko,
    COUNT(*) AS WykonaneSerwisy
FROM Serwisant
JOIN Pracownik ON Serwisant.PracownikID = Pracownik.PracownikID
JOIN Serwis ON Serwis.PracownikID = Pracownik.PracownikID
GROUP BY Pracownik.PracownikID, Pracownik.Imie, Pracownik.Nazwisko
ORDER BY WykonaneSerwisy DESC;

-- List all the cart not related to a transaction (CORRELATED SUBQUERY)
SELECT
    Samochod.SamochodID,
    Samochod.Marka,
    Samochod.Model,
    Samochod.VIN
FROM Samochod
WHERE NOT EXISTS (
    SELECT 1
    FROM Transakcja
    WHERE Transakcja.SamochodID = Samochod.SamochodID
);

-- List employees with more than one task (UNCORRELATED SUBQUERY)
SELECT
    Pracownik.PracownikID,
    Pracownik.Imie,
    Pracownik.Nazwisko,
    COUNT(Zadania.ZadanieID) AS LiczbaZadan
FROM Pracownik
JOIN Zadania ON Zadania.PracownikID = Pracownik.PracownikID
WHERE Pracownik.PracownikID IN (
    SELECT PracownikID
    FROM Zadania
    GROUP BY PracownikID
    HAVING COUNT(*) > 1
)
GROUP BY Pracownik.PracownikID, Pracownik.Imie, Pracownik.Nazwisko;

-- List customers who have bought more than one car (HAVING)
SELECT Klient.Imie, Klient.Nazwisko, COUNT(*) AS TransakcjeKupna
FROM Klient
JOIN Transakcja ON Transakcja.KlientID = Klient.KlientID
WHERE Transakcja.Typ = 'Zakup'
GROUP BY Klient.Imie, Klient.Nazwisko
HAVING COUNT(*) > 1;

-- List details of clients who have bought more than one car (IN)
SELECT PESEL, Imie, Nazwisko, Email, Telefon
FROM Klient
WHERE KlientID IN (
    SELECT Transakcja.KlientID
    FROM Transakcja
    WHERE Transakcja.Typ = 'Zakup'
    GROUP BY Transakcja.KlientID
    HAVING COUNT(*) > 1
);

-- List all cars with more options than the car with the ID of 10 (ANY)
SELECT S.SamochodID, S.Marka, S.Model, S.Rocznik, S.Cena, COUNT(SO.OpcjaID) AS IloscOpcji
FROM Samochod S
JOIN SamochodOpcje SO ON S.SamochodID = SO.SamochodID
WHERE S.SamochodID <> 10
GROUP BY S.SamochodID, S.Marka, S.Model, S.Rocznik, S.Cena
HAVING COUNT(SO.OpcjaID) > ANY (
    SELECT COUNT(SamochodOpcje.OpcjaID)
    FROM SamochodOpcje
    WHERE SamochodID = 10
)
ORDER BY IloscOpcji ASC;

-- List all the cars with a price lower than the Mazda CX-5 (ALL)
SELECT SamochodID, Marka, Model, Cena
FROM Samochod
WHERE Cena < ALL (
    SELECT Cena
    FROM Samochod
    WHERE Marka LIKE 'Mazda' AND Model LIKE 'CX-5'
)
ORDER BY Cena DESC;

-- Lookup a car by the first VIN characters (LIKE)
SELECT SamochodID, Marka, Model, VIN
FROM Samochod
WHERE VIN LIKE 'ABC%';
