-- Insert 15 entries into Manufacturer
INSERT INTO Producent(Nazwa, Kraj) VALUES ('Honda', 'Japonia');
INSERT INTO Producent(Nazwa, Kraj) VALUES ('Ford', 'USA');
INSERT INTO Producent(Nazwa, Kraj) VALUES ('BMW', 'Niemcy');
INSERT INTO Producent(Nazwa, Kraj) VALUES ('Hyundai', 'Korea Południowa');
INSERT INTO Producent(Nazwa, Kraj) VALUES ('Mercedes-Benz', 'Niemcy');
INSERT INTO Producent(Nazwa, Kraj) VALUES ('Nissan', 'Japonia');
INSERT INTO Producent(Nazwa, Kraj) VALUES ('Audi', 'Niemcy');
INSERT INTO Producent(Nazwa, Kraj) VALUES ('Kia', 'Korea Południowa');
INSERT INTO Producent(Nazwa, Kraj) VALUES ('Fiat', 'Włochy');
INSERT INTO Producent(Nazwa, Kraj) VALUES ('Mazda', 'Japonia');
INSERT INTO Producent(Nazwa, Kraj) VALUES ('Jeep', 'USA');
INSERT INTO Producent(Nazwa, Kraj) VALUES ('Volvo', 'Szwecja');
INSERT INTO Producent(Nazwa, Kraj) VALUES ('Subaru', 'Japonia');
INSERT INTO Producent(Nazwa, Kraj) VALUES ('Chrysler', 'USA');
INSERT INTO Producent(Nazwa, Kraj) VALUES ('Mitsuoka', 'Japonia');

-- Insert 15 entries into Car
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (1, 'Honda', 'Accord', 2022, 'ABC123', 96000.00);
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (2, 'Ford', 'Focus', 2016, 'DEF890', 44000.00);
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (7, 'Audi', 'A4', 2020, 'ZXY456', 56000.00);
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (6, 'Nissan', 'Altima', 2019, 'UWZ113', 47600.00);
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (9, 'Fiat', '500', 2017, 'XXS137', 28000.00);
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (10, 'Mazda', 'CX-5', 2018, 'MZD654', 74600.00);
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (10, 'Mazda', 'MX-5', 2021, 'MDA665', 160900.00);
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (4, 'Hyundai', 'Veloster', 2017, '345VST', 102800.00);
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (12, 'Volvo', 'XC90', 2022, 'VLVX90', 220000.00);
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (12, 'Volvo', 'V90', 2013, 'VLVV90', 70000.00);
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (13, 'Subaru', 'Impreza', 2007, 'SBRU07', 63000.00);
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (8, 'Kia', 'Stinger', 2018, 'STGR18', 133000.00);
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (14, 'Chrysler', 'PT-Cruiser', 2006, 'PTCR06', 17000.00);
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (5, 'Mercedes-Benz', 'G Class', 2023, 'GKLS63', 1340000.00);
INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (15, 'Mitsuoka', 'Orochi', 2013, 'MIT013', 560000.00);

-- Insert 15 entries into Options
INSERT INTO Opcje (Nazwa, Cena) VALUES ('Nawigacja', 3000.00);
INSERT INTO Opcje (Nazwa, Cena) VALUES ('Ładowarka bezprzewodowa', 1200.00);
INSERT INTO Opcje (Nazwa, Cena) VALUES ('Kamera cofania', 1500.00);
INSERT INTO Opcje (Nazwa, Cena) VALUES ('Czujniki cofania', 1000.00);
INSERT INTO Opcje (Nazwa, Cena) VALUES ('System monitorowania ślepego punktu', 6600.00);
INSERT INTO Opcje (Nazwa, Cena) VALUES ('Asystent parkowania', 8800.00);
INSERT INTO Opcje (Nazwa, Cena) VALUES ('System bezkluczykowy', 5000.00);
INSERT INTO Opcje (Nazwa, Cena) VALUES ('System monitorowania toru jazdy', 33400.00);
INSERT INTO Opcje (Nazwa, Cena) VALUES ('Podgrzewane siedzenia', 11200.00);
INSERT INTO Opcje (Nazwa, Cena) VALUES ('Podgrzewana kierownica', 4800.00);
INSERT INTO Opcje (Nazwa, Cena) VALUES ('Nagłośnienie premium', 10500.00);
INSERT INTO Opcje (Nazwa, Cena) VALUES ('Panoramiczny dach', 22600.00);
INSERT INTO Opcje (Nazwa, Cena) VALUES ('Opony zimowe', 12400.00);
INSERT INTO Opcje (Nazwa, Cena) VALUES ('Bagażnik na dach', 3300.00);
INSERT INTO Opcje (Nazwa, Cena) VALUES ('Uchwyt na rowery', 1600.00);

-- Insert 91 entries into CarOptions
    -- Insert options for Car with SamochodID = 1
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (1, 1);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (1, 2);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (1, 3);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (1, 4);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (1, 7);

    -- Insert options for Car with SamochodID = 2
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (2, 1);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (2, 3);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (2, 4);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (2, 5);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (2, 7);

    -- Insert options for Car with SamochodID = 3
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (3, 1);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (3, 3);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (3, 4);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (3, 5);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (3, 6);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (3, 7);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (3, 12);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (3, 13);

    -- Insert options for Car with SamochodID = 4
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (4, 1);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (4, 3);

    -- Insert options for Car with SamochodID = 5
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (5, 1);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (5, 3);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (5, 13);

    -- Insert options for Car with SamochodID = 6
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (6, 1);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (6, 3);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (6, 5);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (6, 6);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (6, 8);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (6, 13);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (6, 14);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (6, 15);

    -- Insert options for Car with SamochodID = 7
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (7, 1);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (7, 3);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (7, 4);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (7, 7);

    -- Insert options for Car with SamochodID = 8
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (8, 1);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (8, 3);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (8, 4);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (8, 5);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (8, 6);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (8, 8);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (8, 13);

    -- Insert options for Car with SamochodID = 9
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 1);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 2);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 3);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 4);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 5);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 6);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 7);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 8);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 9);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 10);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 11);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 13);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 14);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 15);

    -- Insert options for Car with SamochodID = 10
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (10, 1);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (10, 3);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (10, 4);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (10, 6);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (10, 9);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (10, 13);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (10, 14);

    -- Insert options for Car with SamochodID = 11
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (11, 13);

    -- Insert options for Car with SamochodID = 12
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 1);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 2);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 3);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 4);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 6);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 7);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 9);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 10);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 11);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 13);

    -- Insert options for Car with SamochodID = 14
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 1);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 2);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 3);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 4);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 5);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 6);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 7);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 8);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 9);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 10);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 11);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 13);

    -- Insert options for Car with SamochodID = 15
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (15, 1);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (15, 3);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (15, 4);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (15, 9);
    INSERT INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (15, 11);

-- Insert 15 entries into ServiceRequest
INSERT INTO SerwisZgloszenie (SamochodID, Opis, Status) VALUES (4, 'Coroczny przegląd Nissan Altima 2019', 'Oczekujące');
INSERT INTO SerwisZgloszenie (SamochodID, Opis, Status) VALUES (5, 'Wymiana hamulców Fiat 500 2017', 'W trakcie');
INSERT INTO SerwisZgloszenie (SamochodID, Opis, Status) VALUES (6, 'Wymiana oleju i filtra Mazda CX-5 2018', 'Zakończone');
INSERT INTO SerwisZgloszenie (SamochodID, Opis, Status) VALUES (7, 'Coroczny przegląd Mazda MX-5 2021', 'Oczekujące');
INSERT INTO SerwisZgloszenie (SamochodID, Opis, Status) VALUES (8, 'Coroczny przegląd Hyundai Veloster 2017', 'Oczekujące');
INSERT INTO SerwisZgloszenie (SamochodID, Opis, Status) VALUES (9, 'Wymiana płynu w skrzyni biegów Volvo XC90 2022', 'Zakończone');
INSERT INTO SerwisZgloszenie (SamochodID, Opis, Status) VALUES (10, 'Wymiana baterii Volvo V90 2013', 'Zakończone');
INSERT INTO SerwisZgloszenie (SamochodID, Opis, Status) VALUES (11, 'Coroczny przegląd Subaru Impreza 2007', 'W trakcie');
INSERT INTO SerwisZgloszenie (SamochodID, Opis, Status) VALUES (12, 'Serwis wentylacji Kia Stinger 2018', 'W trakcie');
INSERT INTO SerwisZgloszenie (SamochodID, Opis, Status) VALUES (13, 'Wymiana świec Chrysler PT-Cruiser 2006', 'Zakończone');
INSERT INTO SerwisZgloszenie (SamochodID, Opis, Status) VALUES (15, 'Przegląd wstępny Mitsuoka Orochi 2013', 'Zakończone');
INSERT INTO SerwisZgloszenie (SamochodID, Opis, Status) VALUES (7, 'Wymiana świec Mazda MX-5 2021', 'Zakończone');
INSERT INTO SerwisZgloszenie (SamochodID, Opis, Status) VALUES (3, 'Wymiana świec Audi A4 2020', 'Zakończone');
INSERT INTO SerwisZgloszenie (SamochodID, Opis, Status) VALUES (14, 'Przegląd wstępny Mercedes-Benz G 2023', 'Zakończone');
INSERT INTO SerwisZgloszenie (SamochodID, Opis, Status) VALUES (15, 'Inspekcja amortyzatorów Mitsuoka Orochi 2013', 'W trakcie');

-- Insert 30 entries into Employee
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Michał', 'Anders', 'Sprzedawca');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Anna', 'Wiśniewska', 'Sprzedawca');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Piotr', 'Nowak', 'Serwisant');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Ewa', 'Dąbrowska', 'Sprzedawca');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Krzysztof', 'Tomaszewski', 'Serwisant');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Joanna', 'Mazurek', 'Sprzedawca');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Daniel', 'Wójcik', 'Serwisant');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Katarzyna', 'Anilewicz', 'Sprzedawca');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Mateusz', 'Brązowy', 'Serwisant');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Olga', 'Hałas', 'Sprzedawca');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Jakub', 'Tomczak', 'Serwisant');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Anna', 'Kowalska', 'Sprzedawca');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Adrian', 'Matej', 'Sprzedawca');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Ireneusz', 'Maksiński', 'Sprzedawca');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Andrzej', 'Dobyń', 'Serwisant');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Monika', 'Kowalczyk', 'Serwisant');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Tomasz', 'Lis', 'Sprzedawca');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Magdalena', 'Zając', 'Serwisant');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Łukasz', 'Szymański', 'Serwisant');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Karolina', 'Czarnecka', 'Sprzedawca');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Marcin', 'Piotrowski', 'Serwisant');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Aleksandra', 'Wrona', 'Serwisant');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Bartosz', 'Kubiak', 'Sprzedawca');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Natalia', 'Jasińska', 'Serwisant');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Kamil', 'Kowal', 'Sprzedawca');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Alicja', 'Olejnik', 'Serwisant');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Grzegorz', 'Sikora', 'Sprzedawca');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Dominika', 'Czech', 'Sprzedawca');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Rafał', 'Stolarz', 'Sprzedawca');
INSERT INTO Pracownik (Imie, Nazwisko, Stanowisko) VALUES ('Ewelina', 'Wawrzyniak', 'Serwisant');

-- Insert 15 entries into Service
INSERT INTO Serwis (ZgloszenieID, PracownikID, Data) VALUES (1, 16, date'2023-04-05');
INSERT INTO Serwis (ZgloszenieID, PracownikID, Data) VALUES (2, 3, date'2023-05-10');
INSERT INTO Serwis (ZgloszenieID, PracownikID, Data) VALUES (3, 5, date'2023-06-15');
INSERT INTO Serwis (ZgloszenieID, PracownikID, Data) VALUES (4, 16, date'2023-07-20');
INSERT INTO Serwis (ZgloszenieID, PracownikID, Data) VALUES (5, 26, date'2023-08-25');
INSERT INTO Serwis (ZgloszenieID, PracownikID, Data) VALUES (6, 30, date'2023-09-30');
INSERT INTO Serwis (ZgloszenieID, PracownikID, Data) VALUES (7, 9, date'2023-10-05');
INSERT INTO Serwis (ZgloszenieID, PracownikID, Data) VALUES (8, 26, date'2023-11-10');
INSERT INTO Serwis (ZgloszenieID, PracownikID, Data) VALUES (9, 21, date'2023-12-15');
INSERT INTO Serwis (ZgloszenieID, PracownikID, Data) VALUES (10, 15, date'2024-01-20');
INSERT INTO Serwis (ZgloszenieID, PracownikID, Data) VALUES (11, 19, date'2024-02-25');
INSERT INTO Serwis (ZgloszenieID, PracownikID, Data) VALUES (12, 22, date'2023-03-10');
INSERT INTO Serwis (ZgloszenieID, PracownikID, Data) VALUES (13, 11, date'2023-04-15');
INSERT INTO Serwis (ZgloszenieID, PracownikID, Data) VALUES (14, 16, date'2024-05-20');
INSERT INTO Serwis (ZgloszenieID, PracownikID, Data) VALUES (15, 26, date'2024-06-25');

-- Insert 15 entries into Salesperson
INSERT INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (1, 58);
INSERT INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (2, 44);
INSERT INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (4, 24);
INSERT INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (8, 99);
INSERT INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (10, 93);
INSERT INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (12, 47);
INSERT INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (13, 72);
INSERT INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (14, 62);
INSERT INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (17, 95);
INSERT INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (20, 98);
INSERT INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (23, 87);
INSERT INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (25, 78);
INSERT INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (27, 33);
INSERT INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (28, 18);
INSERT INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (29, 69);

-- Insert 15 entries into Mechanic
INSERT INTO Serwisant (PracownikID, Specjalizacje) VALUES (3, 'Hamulce');
INSERT INTO Serwisant (PracownikID, Specjalizacje) VALUES (5, 'Serwis');
INSERT INTO Serwisant (PracownikID, Specjalizacje) VALUES (6, 'Opony');
INSERT INTO Serwisant (PracownikID, Specjalizacje) VALUES (7, 'Skrzynia biegów');
INSERT INTO Serwisant (PracownikID, Specjalizacje) VALUES (9, 'Elektronika');
INSERT INTO Serwisant (PracownikID, Specjalizacje) VALUES (11, 'Serwis');
INSERT INTO Serwisant (PracownikID, Specjalizacje) VALUES (15, 'Silnik');
INSERT INTO Serwisant (PracownikID, Specjalizacje) VALUES (16, 'Przeglądy');
INSERT INTO Serwisant (PracownikID, Specjalizacje) VALUES (18, 'Skrzynia biegów');
INSERT INTO Serwisant (PracownikID, Specjalizacje) VALUES (19, 'Amortyzacja');
INSERT INTO Serwisant (PracownikID, Specjalizacje) VALUES (21, 'Wentylacja');
INSERT INTO Serwisant (PracownikID, Specjalizacje) VALUES (22, 'Serwis');
INSERT INTO Serwisant (PracownikID, Specjalizacje) VALUES (24, 'Elektronika');
INSERT INTO Serwisant (PracownikID, Specjalizacje) VALUES (26, 'Przeglądy');
INSERT INTO Serwisant (PracownikID, Specjalizacje) VALUES (30, 'Skrzynia biegów');

-- Insert 29 entries into Tasks
INSERT INTO Zadania (PracownikID, Opis) VALUES (1, 'Oddzwonienie do klienta');
INSERT INTO Zadania (PracownikID, Opis) VALUES (2, 'Finalizacja zamówienia');
INSERT INTO Zadania (PracownikID, Opis) VALUES (3, 'Wymiana hamulców w pojeździe klienta');
INSERT INTO Zadania (PracownikID, Opis) VALUES (4, 'Prezentacja samochodu');
INSERT INTO Zadania (PracownikID, Opis) VALUES (6, 'Założenie opon zimowych');
INSERT INTO Zadania (PracownikID, Opis) VALUES (17, 'Przedstawienie oferty klientowi');
INSERT INTO Zadania (PracownikID, Opis) VALUES (5, 'Serwis pojazdu klienta');
INSERT INTO Zadania (PracownikID, Opis) VALUES (23, 'Przygotowanie oferty');
INSERT INTO Zadania (PracownikID, Opis) VALUES (10, 'Przygotowanie oferty');
INSERT INTO Zadania (PracownikID, Opis) VALUES (29, 'Finalizacja zamówienia');
INSERT INTO Zadania (PracownikID, Opis) VALUES (2, 'Przygotowanie oferty');
INSERT INTO Zadania (PracownikID, Opis) VALUES (7, 'Wymiana sprzęgła');
INSERT INTO Zadania (PracownikID, Opis) VALUES (13, 'Oddzwonienie do klienta');
INSERT INTO Zadania (PracownikID, Opis) VALUES (1, 'Przedstawienie oferty klientowi');
INSERT INTO Zadania (PracownikID, Opis) VALUES (14, 'Prezentacja samochodu');
INSERT INTO Zadania (PracownikID, Opis) VALUES (1, 'Przygotowanie oferty');
INSERT INTO Zadania (PracownikID, Opis) VALUES (30, 'Wymiana płynu w skrzyni biegów');
INSERT INTO Zadania (PracownikID, Opis) VALUES (8, 'Finalizacja zamówienia');
INSERT INTO Zadania (PracownikID, Opis) VALUES (28, 'Przygotowanie oferty');
INSERT INTO Zadania (PracownikID, Opis) VALUES (15, 'Serwis pojazdu klienta');
INSERT INTO Zadania (PracownikID, Opis) VALUES (12, 'Prezentacja samochodu');
INSERT INTO Zadania (PracownikID, Opis) VALUES (10, 'P;rzygotowanie oferty');
INSERT INTO Zadania (PracownikID, Opis) VALUES (19, 'Serwis pojazdu klienta');
INSERT INTO Zadania (PracownikID, Opis) VALUES (30, 'Diagnoza skrzyni biegów');
INSERT INTO Zadania (PracownikID, Opis) VALUES (4, 'Prezentacja samochodu');
INSERT INTO Zadania (PracownikID, Opis) VALUES (26, 'Wstępny przegląd pojazdu klienta');
INSERT INTO Zadania (PracownikID, Opis) VALUES (24, 'Diagnoza wyświetlacza');
INSERT INTO Zadania (PracownikID, Opis) VALUES (16, 'Wstępny przegląd pojazdu klienta');
INSERT INTO Zadania (PracownikID, Opis) VALUES (22, 'Serwis pojazdu klienta');

-- Insert 15 entries into Customer
INSERT INTO Klient (Imie, Nazwisko, Email, PESEL, Telefon) VALUES ('Jakub', 'Nowak', 'jakub.nowak@email.com', 88082261274, '345-678-901');
INSERT INTO Klient (Imie, Nazwisko, Email, PESEL, Telefon) VALUES ('Anna', 'Kowalska', 'anna.kowalska@email.com', 98072647959, '456-789-012');
INSERT INTO Klient (Imie, Nazwisko, Email, PESEL, Telefon) VALUES ('Mateusz', 'Wiśniewski', 'mateusz.wisniewski@email.com', 68050359239, '567-890-123');
INSERT INTO Klient (Imie, Nazwisko, Email, PESEL, Telefon) VALUES ('Zuzanna', 'Jankowska', 'zuzanna.jankowska@email.com', 54012815983, '678-901-234');
INSERT INTO Klient (Imie, Nazwisko, Email, PESEL, Telefon) VALUES ('Jan', 'Kowalczyk', 'jan.kowalczyk@email.com', 90020637551, '789-012-345');
INSERT INTO Klient (Imie, Nazwisko, Email, PESEL, Telefon) VALUES ('Maja', 'Nowakowska', 'maja.nowakowska@email.com', 63020119532, '890-123-456');
INSERT INTO Klient (Imie, Nazwisko, Email, PESEL, Telefon) VALUES ('Piotr', 'Woźniak', 'piotr.wozniak@email.com', 62061174753, '901-234-567');
INSERT INTO Klient (Imie, Nazwisko, Email, PESEL, Telefon) VALUES ('Alicja', 'Krawczyk', 'alicja.krawczyk@email.com', 55070789795, '123-456-789');
INSERT INTO Klient (Imie, Nazwisko, Email, PESEL, Telefon) VALUES ('Filip', 'Lewandowski', 'filip.lewandowski@email.com', 90060176629, '234-567-890');
INSERT INTO Klient (Imie, Nazwisko, Email, PESEL, Telefon) VALUES ('Zofia', 'Dąbrowska', 'zofia.dabrowska@email.com', 76110569568, '345-678-901');
INSERT INTO Klient (Imie, Nazwisko, Email, PESEL, Telefon) VALUES ('Oliwia', 'Zielińska', 'oliwia.zielinska@email.com', 60072686711, '456-789-012');
INSERT INTO Klient (Imie, Nazwisko, Email, PESEL, Telefon) VALUES ('Kacper', 'Szymański', 'kacper.szymanski@email.com', 82101762366, '567-890-123');
INSERT INTO Klient (Imie, Nazwisko, Email, PESEL, Telefon) VALUES ('Maja', 'Kaczmarek', 'maja.kaczmarek@email.com', 96111687962, '123-654-789');
INSERT INTO Klient (Imie, Nazwisko, Email, PESEL, Telefon) VALUES ('Adam', 'Mazurek', 'adam.mazurek@email.com', 65082855476, '234-576-890');
INSERT INTO Klient (Imie, Nazwisko, Email, PESEL, Telefon) VALUES ('Michał', 'Duda', 'michal.duda@email.com', 51050911387, '456-789-014');

-- Insert 15 entries into Transaction
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (14, 15, 29, 'Zakup', date'2023-04-10');
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (3, 1, 11, 'Serwis', date'2023-05-13');
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (15, 3, 8, 'Zakup', date'2023-06-15');
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (13, 2, 15, 'Serwis', date'2023-07-17');
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (11, 12, 26, 'Serwis', date'2023-08-22');
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (7, 10, 5, 'Serwis', date'2023-09-28');
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (8, 5, 26, 'Serwis', date'2023-10-30');
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (9, 8, 30, 'Serwis', date'2023-11-06');
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (4, 11, 16, 'Serwis', date'2023-12-11');
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (1, 6, 2, 'Zakup', date'2024-01-17');
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (12, 5, 9, 'Serwis', date'2024-02-23');
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (5, 14, 3, 'Serwis', date'2024-03-27');
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (15, 3, 26, 'Serwis', date'2024-04-30');
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (10, 15, 9, 'Serwis', date'2024-05-09');
INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data) VALUES (2, 7, 29, 'Serwis', date'2024-06-12');

-- Insert 6 entries into Discount
INSERT INTO Rabat (TransakcjaID, KlientID, Kwota, Procent, Rodzaj) VALUES (5, 12, NULL, 5, 'Procent');
INSERT INTO Rabat (TransakcjaID, KlientID, Kwota, Procent, Rodzaj) VALUES (6, 10, 125.00, NULL, 'Kwota');
INSERT INTO Rabat (TransakcjaID, KlientID, Kwota, Procent, Rodzaj) VALUES (7, 5, 300.00, NULL, 'Kwota');
INSERT INTO Rabat (TransakcjaID, KlientID, Kwota, Procent, Rodzaj) VALUES (10, 6, 150.00, NULL, 'Kwota');
INSERT INTO Rabat (TransakcjaID, KlientID, Kwota, Procent, Rodzaj) VALUES (13, 3, NULL, 100, 'Procent');
INSERT INTO Rabat (TransakcjaID, KlientID, Kwota, Procent, Rodzaj) VALUES (14, 15, NULL, 20, 'Procent');

-- Insert 15 entries into Payment
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (1, 1340000.00, date'2023-04-10');
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (2, 450.00, date'2023-05-13');
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (3, 560000.00, date'2023-06-15');
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (4, 350.00, date'2023-07-17');
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (5, 1200.00, date'2023-08-22');
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (6, 1200.00, date'2023-09-28');
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (7, 1200.00, date'2023-10-30');
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (8, 1000.00, date'2023-11-06');
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (9, 1200.00, date'2023-12-11');
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (10, 96000.00, date'2024-01-17');
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (11, 760.00, date'2024-02-23');
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (12, 1300.00, date'2024-03-27');
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (13, 3300.00, date'2024-04-30');
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (14, 14200.00, date'2024-05-09');
INSERT INTO Platnosc (TransakcjaID, Wartosc, Data) VALUES (15, 44000.00, date'2024-06-12');
