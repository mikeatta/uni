-- Insert into Manufacturer
INSERT INTO Producent (Nazwa, Kraj) VALUES ('Toyota', 'Japonia');
INSERT INTO Producent (Nazwa, Kraj) VALUES ('Chevrolet', 'USA');
INSERT INTO Producent (Nazwa, Kraj) VALUES ('Volkswagen', 'Niemcy');

-- Insert into Car
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (16, 'Toyota', 'Camry', 2021, 'XYZ789', 75000.00);
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (16, 'Toyota', 'Prius', 2023, 'PRS383', 114000.00);
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (17, 'Chevrolet', 'Malibu', 2018, 'LMN456', 68000.00);
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (18, 'Volkswagen', 'Passat', 2016, 'OPQ123', 72000.00);

-- Insert into CarOptions
    -- Insert options for Car with SamochodID = 16
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (16, 1);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (16, 2);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (16, 3);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (16, 4);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (16, 9);

    -- Insert options for Car with SamochodID = 17
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (17, 1);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (17, 2);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (17, 3);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (17, 4);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (17, 5);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (17, 8);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (17, 9);

    -- Insert options for Car with SamochodID = 18
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (18, 1);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (18, 2);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (18, 3);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (18, 4);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (18, 5);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (18, 9);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (18, 11);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (18, 12);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (18, 13);

-- Insert into ServiceRequest
INSERT INTO SerwisZgloszenie (SamochodID, Opis, Status) VALUES (17, 'Przegląd wstępny', 'Oczekujące');
INSERT INTO SerwisZgloszenie (SamochodID, Opis, Status) VALUES (5, 'Wymiana opon', 'Oczekujące');

-- Insert into Service
INSERT INTO Serwis (ZgloszenieID, PracownikID, Data) VALUES (16, 7, date'2024-07-30');
INSERT INTO Serwis (ZgloszenieID, PracownikID, Data) VALUES (17, 6, date'2024-08-03');

-- Insert into Employee
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Adam', 'Kaczmarek', 'Sprzedawca');

-- Insert into Tasks
INSERT INTO Zadania (PracownikID, Opis) VALUES (23, 'Finalizacja zamówienia');
INSERT INTO Zadania (PracownikID, Opis) VALUES (20, 'Prezentacja nowego modelu');
INSERT INTO Zadania (PracownikID, Opis) VALUES (27, 'Finalizacja zamówienia');
INSERT INTO Zadania (PracownikID, Opis) VALUES (31, 'Przygotowanie oferty');

-- Insert into Customer
INSERT INTO Klient (Imie, Nazwisko, Email, PESEL, Telefon) VALUES ('Paweł', 'Nowak', 'pawel.nowak@email.com', 91051926564, '890-123-456');
INSERT INTO Klient (Imie, Nazwisko, Email, PESEL, Telefon) VALUES ('Kamil', 'Dąbrowski', 'kamil.dabrowski@email.com', 81012227579, '012-345-678');

-- Insert into Transaction
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (17, 16, 23, 'Zakup', date'2024-07-23');
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (19, 17, 27, 'Zakup', date'2024-07-28');
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (17, 16, 5, 'Serwis', date'2024-07-30');
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (5, 14, 6, 'Serwis', date'2024-08-03');

-- Insert into Discount
INSERT INTO Rabat (TransakcjaID, KlientID, Kwota, Procent, Rodzaj) VALUES (18, 16, NULL, 100, 'Procent');

-- Insert into Payment
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (16, 114000.00, date'2024-07-23');
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (17, 72000.00, date'2024-07-28');
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (18, 1000.00, date'2024-07-30');
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (19, 800.00, date'2024-08-03');
