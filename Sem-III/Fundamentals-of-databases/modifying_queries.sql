-- Remove 'Kamera cofania' from options on cars made in 2015 or later
DELETE FROM SamochodOpcje
WHERE OpcjaID IN (
    SELECT Opcje.OpcjaID
    FROM Opcje
    JOIN SamochodOpcje ON SamochodOpcje.OpcjaID = Opcje.OpcjaID
    JOIN Samochod ON Samochod.SamochodID = SamochodOpcje.SamochodID
    WHERE Nazwa = 'Kamera cofania' AND Samochod.Rocznik >= 2015
);

-- Remove clients who have not completed any transactions
DELETE FROM Klient
WHERE KlientID NOT IN (
    SELECT Klient.KlientID
    FROM Klient
    JOIN Transakcja ON Transakcja.KlientID = Klient.KlientID
);

-- Increase the prices of the cheapest options by 10 percent
UPDATE Opcje
SET Cena = Cena * 1.10
WHERE OpcjaID IN (
    SELECT Opcje.OpcjaID
    FROM Opcje
    ORDER BY Cena ASC
    FETCH FIRST 7 ROWS ONLY
);

-- Lower the prices of the cars not related to any transaction by 10K
UPDATE Samochod
SET Cena = Cena - 10000
WHERE SamochodID NOT IN (
    SELECT Samochod.SamochodID
    FROM Samochod
    JOIN Transakcja ON Transakcja.SamochodID = Samochod.SamochodID
);

-- Update the price on a car with a specific ID by including option costs
UPDATE Samochod
SET Cena = COALESCE(Cena + (
    SELECT SUM(Opcje.Cena) AS KosztOpcji
    FROM SamochodOpcje
    JOIN Opcje ON Opcje.OpcjaID = SamochodOpcje.OpcjaID
    WHERE SamochodID = :SamochodID),
    Samochod.Cena -- leave price as-is in the case of null values
)
WHERE SamochodID = :SamochodID;

-- Add missing employees to the salespeople table
INSERT INTO Sprzedawca (PracownikID, IloscTransakcji)
SELECT Pracownik.PracownikID, 0 AS IloscTransakcji
FROM Pracownik
LEFT JOIN Sprzedawca ON Sprzedawca.PracownikID = Pracownik.PracownikID
WHERE Sprzedawca.PracownikID IS NULL
AND Pracownik.Stanowisko = 'Sprzedawca';

-- Update salespeople sales amounts with current database data
UPDATE Sprzedawca
SET IloscTransakcji = (
    SELECT COUNT(DISTINCT Transakcja.TransakcjaID) AS AktualneTransakcje
    FROM Pracownik
    LEFT JOIN Transakcja ON Transakcja.PracownikID = Pracownik.PracownikID
    WHERE Pracownik.Stanowisko = 'Sprzedawca'
    AND Sprzedawca.PracownikID = Pracownik.PracownikID
    GROUP BY Pracownik.PracownikID
)
WHERE PracownikID IN (
    SELECT PracownikID
    FROM Pracownik
    WHERE Stanowisko = 'Sprzedawca'
);
