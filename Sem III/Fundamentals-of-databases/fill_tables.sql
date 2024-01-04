-- Insert 15 entries into Manufacturer
INSERT ALL
    INTO Producent(ProducentID, Nazwa, Kraj) VALUES (1, 'Honda', 'Japonia')
    INTO Producent(ProducentID, Nazwa, Kraj) VALUES (2, 'Ford', 'USA')
    INTO Producent(ProducentID, Nazwa, Kraj) VALUES (3, 'BMW', 'Niemcy')
    INTO Producent(ProducentID, Nazwa, Kraj) VALUES (4, 'Hyundai', 'Korea Południowa')
    INTO Producent(ProducentID, Nazwa, Kraj) VALUES (5, 'Mercedes-Benz', 'Niemcy')
    INTO Producent(ProducentID, Nazwa, Kraj) VALUES (6, 'Nissan', 'Japonia')
    INTO Producent(ProducentID, Nazwa, Kraj) VALUES (7, 'Audi', 'Niemcy')
    INTO Producent(ProducentID, Nazwa, Kraj) VALUES (8, 'Kia', 'Korea Południowa')
    INTO Producent(ProducentID, Nazwa, Kraj) VALUES (9, 'Fiat', 'Włochy')
    INTO Producent(ProducentID, Nazwa, Kraj) VALUES (10, 'Mazda', 'Japonia')
    INTO Producent(ProducentID, Nazwa, Kraj) VALUES (11, 'Jeep', 'USA')
    INTO Producent(ProducentID, Nazwa, Kraj) VALUES (12, 'Volvo', 'Szwecja')
    INTO Producent(ProducentID, Nazwa, Kraj) VALUES (13, 'Subaru', 'Japonia')
    INTO Producent(ProducentID, Nazwa, Kraj) VALUES (14, 'Chrysler', 'USA')
    INTO Producent(ProducentID, Nazwa, Kraj) VALUES (15, 'Mitsuoka', 'Japonia')
SELECT * FROM dual;

-- Insert 15 entries into Car
INSERT ALL
    INTO Samochod (SamochodID, ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (1, 1, 'Honda', 'Accord', 2022, 'ABC123', 96000)
    INTO Samochod (SamochodID, ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (2, 2, 'Ford', 'Focus', 2016, 'DEF890', 44000)
    INTO Samochod (SamochodID, ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (3, 7, 'Audi', 'A4', 2020, 'ZXY456', 56000)
    INTO Samochod (SamochodID, ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (4, 6, 'Nissan', 'Altima', 2019, 'UWZ113', 47600)
    INTO Samochod (SamochodID, ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (5, 9, 'Fiat', '500', 2017, 'XXS137', 28000)
    INTO Samochod (SamochodID, ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (6, 10, 'Mazda', 'CX-5', 2018, 'MZD654', 74600)
    INTO Samochod (SamochodID, ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (7, 10, 'Mazda', 'MX-5', 2021, 'MDA665', 160900)
    INTO Samochod (SamochodID, ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (8, 4, 'Hyundai', 'Veloster', 2017, '345VST', 102800)
    INTO Samochod (SamochodID, ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (9, 12, 'Volvo', 'XC90', 2022, 'VLVX90', 220000)
    INTO Samochod (SamochodID, ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (10, 12, 'VOlvo', 'V90', 2013, 'VLVV90', 70000)
    INTO Samochod (SamochodID, ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (11, 13, 'Subaru', 'Impreza', 2007, 'SBRU07', 63000)
    INTO Samochod (SamochodID, ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (12, 8, 'Kia', 'Stinger', 2018, 'STGR18', 133000)
    INTO Samochod (SamochodID, ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (13, 14, 'Chrysler', 'PT-Cruiser', 2006, 'PTCR06', 17000)
    INTO Samochod (SamochodID, ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (14, 5, 'Mercedes-Benz', 'G Class', 2023, 'GKLS63', 1340000)
    INTO Samochod (SamochodID, ProducentID, Marka, Model, Rocznik, VIN, Cena) VALUES (15, 15, 'Mitsuoka', 'Orochi', 2013, 'MIT013', 560000)
SELECT * FROM dual;

-- Insert 15 entries into Options
INSERT ALL
    INTO Opcje (OpcjaID, Nazwa, Cena) VALUES (1, 'Nawigacja', 3000)
    INTO Opcje (OpcjaID, Nazwa, Cena) VALUES (2, 'Ładowarka bezprzewodowa', 1200)
    INTO Opcje (OpcjaID, Nazwa, Cena) VALUES (3, 'Kamera cofania', 1500)
    INTO Opcje (OpcjaID, Nazwa, Cena) VALUES (4, 'Czujniki cofania', 1000)
    INTO Opcje (OpcjaID, Nazwa, Cena) VALUES (5, 'System monitorowania ślepego punktu', 6600)
    INTO Opcje (OpcjaID, Nazwa, Cena) VALUES (6, 'Asystent parkowania', 8800)
    INTO Opcje (OpcjaID, Nazwa, Cena) VALUES (7, 'System bezkluczykowy', 5000)
    INTO Opcje (OpcjaID, Nazwa, Cena) VALUES (8, 'System monitorowania toru jazdy', 33400)
    INTO Opcje (OpcjaID, Nazwa, Cena) VALUES (9, 'Podgrzewane siedzenia', 11200)
    INTO Opcje (OpcjaID, Nazwa, Cena) VALUES (10, 'Podgrzewana kierownica', 4800)
    INTO Opcje (OpcjaID, Nazwa, Cena) VALUES (11, 'Nagłośnienie premium', 10500)
    INTO Opcje (OpcjaID, Nazwa, Cena) VALUES (12, 'Panoramiczny dach', 22600)
    INTO Opcje (OpcjaID, Nazwa, Cena) VALUES (13, 'Opony zimowe', 12400)
    INTO Opcje (OpcjaID, Nazwa, Cena) VALUES (14, 'Bagażnik na dach', 3300)
    INTO Opcje (OpcjaID, Nazwa, Cena) VALUES (15, 'Uchwyt na rowery', 1600)
SELECT * FROM dual;

-- Insert 91 entries into CarOptions
INSERT ALL
    -- Insert options for Car with SamochodID = 1
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (1, 1)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (1, 2)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (1, 3)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (1, 4)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (1, 7)

    -- Insert options for Car with SamochodID = 2
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (2, 1)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (2, 3)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (2, 4)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (2, 5)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (2, 7)

    -- Insert options for Car with SamochodID = 3
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (3, 1)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (3, 3)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (3, 4)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (3, 5)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (3, 6)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (3, 7)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (3, 12)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (3, 13)

    -- Insert options for Car with SamochodID = 4
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (4, 1)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (4, 3)

    -- Insert options for Car with SamochodID = 5
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (5, 1)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (5, 3)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (5, 13)

    -- Insert options for Car with SamochodID = 6
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (6, 1)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (6, 3)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (6, 5)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (6, 6)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (6, 8)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (6, 13)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (6, 14)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (6, 15)

    -- Insert options for Car with SamochodID = 7
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (7, 1)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (7, 3)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (7, 4)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (7, 7)

    -- Insert options for Car with SamochodID = 8
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (8, 1)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (8, 3)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (8, 4)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (8, 5)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (8, 6)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (8, 8)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (8, 13)

    -- Insert options for Car with SamochodID = 9
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 1)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 2)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 3)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 4)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 5)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 6)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 7)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 8)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 9)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 10)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 11)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 13)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 14)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (9, 15)

    -- Insert options for Car with SamochodID = 10
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (10, 1)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (10, 3)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (10, 4)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (10, 6)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (10, 9)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (10, 13)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (10, 14)

    -- Insert options for Car with SamochodID = 11
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (11, 13)

    -- Insert options for Car with SamochodID = 12
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 1)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 2)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 3)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 4)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 6)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 7)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 9)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 10)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 11)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (12, 13)

    -- Insert options for Car with SamochodID = 14
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 1)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 2)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 3)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 4)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 5)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 6)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 7)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 8)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 9)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 10)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 11)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (14, 13)

    -- Insert options for Car with SamochodID = 15
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (15, 1)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (15, 3)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (15, 4)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (15, 9)
    INTO SamochodOpcje (SamochodID, OpcjaID) VALUES (15, 11)
SELECT * FROM dual;

-- Insert 15 entries into ServiceRequest
INSERT ALL
    INTO SerwisZgloszenie (ZgloszenieID, SamochodID, Opis, Status) VALUES (1, 4, 'Coroczny przegląd Nissan Altima 2019', 'Oczekujące')
    INTO SerwisZgloszenie (ZgloszenieID, SamochodID, Opis, Status) VALUES (2, 5, 'Wymiana hamulców Fiat 500 2017', 'W trakcie')
    INTO SerwisZgloszenie (ZgloszenieID, SamochodID, Opis, Status) VALUES (3, 6, 'Wymiana oleju i filtra Mazda CX-5 2018', 'Zakończone')
    INTO SerwisZgloszenie (ZgloszenieID, SamochodID, Opis, Status) VALUES (4, 7, 'Coroczny przegląd Mazda MX-5 2021', 'Oczekujące')
    INTO SerwisZgloszenie (ZgloszenieID, SamochodID, Opis, Status) VALUES (5, 8, 'Coroczny przegląd Hyundai Veloster 2017', 'Oczekujące')
    INTO SerwisZgloszenie (ZgloszenieID, SamochodID, Opis, Status) VALUES (6, 9, 'Wymiana płynu w skrzyni biegów Volvo XC90 2022', 'Zakończone')
    INTO SerwisZgloszenie (ZgloszenieID, SamochodID, Opis, Status) VALUES (7, 10, 'Wymiana baterii Volvo V90 2013', 'Zakończone')
    INTO SerwisZgloszenie (ZgloszenieID, SamochodID, Opis, Status) VALUES (8, 11, 'Coroczny przegląd Subaru Impreza 2007', 'W trakcie')
    INTO SerwisZgloszenie (ZgloszenieID, SamochodID, Opis, Status) VALUES (9, 12, 'Serwis wentylacji Kia Stinger 2018', 'W trakcie')
    INTO SerwisZgloszenie (ZgloszenieID, SamochodID, Opis, Status) VALUES (10, 13, 'Wymiana świec Chrysler PT-Cruiser 2006', 'Zakończone')
    INTO SerwisZgloszenie (ZgloszenieID, SamochodID, Opis, Status) VALUES (11, 15, 'Przegląd wstępny Mitsuoka Orochi 2013', 'Zakończone')
    INTO SerwisZgloszenie (ZgloszenieID, SamochodID, Opis, Status) VALUES (12, 7, 'Wymiana świec Mazda MX-5 2021', 'Zakończone')
    INTO SerwisZgloszenie (ZgloszenieID, SamochodID, Opis, Status) VALUES (13, 3, 'Wymiana świec Audi A4 2020', 'Zakończone')
    INTO SerwisZgloszenie (ZgloszenieID, SamochodID, Opis, Status) VALUES (14, 14, 'Przegląd wstępny Mercedes-Benz G 2023', 'Zakończone')
    INTO SerwisZgloszenie (ZgloszenieID, SamochodID, Opis, Status) VALUES (15, 15, 'Inspekcja amortyzatorów Mitsuoka Orochi 2013', 'W trakcie')
SELECT * FROM dual;

-- Insert 30 entries into Employee
INSERT ALL
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (1, 'Michał', 'Anders', 'Sprzedawca')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (2, 'Anna', 'Wiśniewska', 'Sprzedawca')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (3, 'Piotr', 'Nowak', 'Serwisant')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (4, 'Ewa', 'Dąbrowska', 'Sprzedawca')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (5, 'Krzysztof', 'Tomaszewski', 'Serwisant')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (6, 'Joanna', 'Mazurek', 'Sprzedawca')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (7, 'Daniel', 'Wójcik', 'Serwisant')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (8, 'Katarzyna', 'Anilewicz', 'Serwisant')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (9, 'Mateusz', 'Brązowy', 'Serwisant')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (10, 'Olga', 'Hałas', 'Sprzedawca')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (11, 'Jakub', 'Tomczak', 'Serwisant')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (12, 'Anna', 'Kowalska', 'Sprzedawca')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (13, 'Adrian', 'Matej', 'Sprzedawca')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (14, 'Ireneusz', 'Maksiński', 'Sprzedawca')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (15, 'Andrzej', 'Dobyń', 'Serwisant')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (16, 'Monika', 'Kowalczyk', 'Serwisant')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (17, 'Tomasz', 'Lis', 'Sprzedawca')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (18, 'Magdalena', 'Zając', 'Serwisant')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (19, 'Łukasz', 'Szymański', 'Serwisant')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (20, 'Karolina', 'Czarnecka', 'Sprzedawca')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (21, 'Marcin', 'Piotrowski', 'Serwisant')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (22, 'Aleksandra', 'Wrona', 'Serwisant')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (23, 'Bartosz', 'Kubiak', 'Sprzedawca')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (24, 'Natalia', 'Jasińska', 'Serwisant')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (25, 'Kamil', 'Kowal', 'Sprzedawca')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (26, 'Alicja', 'Olejnik', 'Serwisant')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (27, 'Grzegorz', 'Sikora', 'Sprzedawca')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (28, 'Dominika', 'Czech', 'Sprzedawca')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (29, 'Rafał', 'Stolarz', 'Sprzedawca')
    INTO Pracownik (PracownikID, Imie, Nazwisko, Stanowisko) VALUES (30, 'Ewelina', 'Wawrzyniak', 'Serwisant')
SELECT * FROM dual;

-- Insert 15 entries into Service
INSERT ALL
    INTO Serwis (SerwisID, ZgloszenieID, PracownikID, Data) VALUES (1, 1, 16, date'2023-04-05')
    INTO Serwis (SerwisID, ZgloszenieID, PracownikID, Data) VALUES (2, 2, 3, date'2023-05-10')
    INTO Serwis (SerwisID, ZgloszenieID, PracownikID, Data) VALUES (3, 3, 5, date'2023-06-15')
    INTO Serwis (SerwisID, ZgloszenieID, PracownikID, Data) VALUES (4, 4, 16, date'2023-07-20')
    INTO Serwis (SerwisID, ZgloszenieID, PracownikID, Data) VALUES (5, 5, 26, date'2023-08-25')
    INTO Serwis (SerwisID, ZgloszenieID, PracownikID, Data) VALUES (6, 6, 30, date'2023-09-30')
    INTO Serwis (SerwisID, ZgloszenieID, PracownikID, Data) VALUES (7, 7, 9, date'2023-10-05')
    INTO Serwis (SerwisID, ZgloszenieID, PracownikID, Data) VALUES (8, 8, 26, date'2023-11-10')
    INTO Serwis (SerwisID, ZgloszenieID, PracownikID, Data) VALUES (9, 9, 21, date'2023-12-15')
    INTO Serwis (SerwisID, ZgloszenieID, PracownikID, Data) VALUES (10, 10, 15, date'2024-01-20')
    INTO Serwis (SerwisID, ZgloszenieID, PracownikID, Data) VALUES (11, 11, 19, date'2024-02-25')
    INTO Serwis (SerwisID, ZgloszenieID, PracownikID, Data) VALUES (12, 12, 22, date'2023-03-10')
    INTO Serwis (SerwisID, ZgloszenieID, PracownikID, Data) VALUES (13, 13, 11, date'2023-04-15')
    INTO Serwis (SerwisID, ZgloszenieID, PracownikID, Data) VALUES (14, 14, 16, date'2024-05-20')
    INTO Serwis (SerwisID, ZgloszenieID, PracownikID, Data) VALUES (15, 15, 26, date'2024-06-25')
SELECT * FROM dual;

-- Insert 15 entries into Salesperson
INSERT ALL
    INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (1, 58)
    INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (2, 44)
    INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (4, 24)
    INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (8, 99)
    INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (10, 93)
    INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (12, 47)
    INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (13, 72)
    INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (14, 62)
    INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (17, 95)
    INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (20, 98)
    INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (23, 87)
    INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (25, 78)
    INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (27, 33)
    INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (28, 18)
    INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (29, 69)
SELECT * FROM dual;

-- Insert 15 entries into Mechanic
INSERT ALL
    INTO Serwisant (PracownikID, Specjalizacje) VALUES (3, 'Hamulce')
    INTO Serwisant (PracownikID, Specjalizacje) VALUES (5, 'Serwis')
    INTO Serwisant (PracownikID, Specjalizacje) VALUES (6, 'Opony')
    INTO Serwisant (PracownikID, Specjalizacje) VALUES (7, 'Skrzynia biegów')
    INTO Serwisant (PracownikID, Specjalizacje) VALUES (9, 'Elektronika')
    INTO Serwisant (PracownikID, Specjalizacje) VALUES (11, 'Serwis')
    INTO Serwisant (PracownikID, Specjalizacje) VALUES (15, 'Silnik')
    INTO Serwisant (PracownikID, Specjalizacje) VALUES (16, 'Przeglądy')
    INTO Serwisant (PracownikID, Specjalizacje) VALUES (18, 'Skrzynia biegów')
    INTO Serwisant (PracownikID, Specjalizacje) VALUES (19, 'Amortyzacja')
    INTO Serwisant (PracownikID, Specjalizacje) VALUES (21, 'Wentylacja')
    INTO Serwisant (PracownikID, Specjalizacje) VALUES (22, 'Serwis')
    INTO Serwisant (PracownikID, Specjalizacje) VALUES (24, 'Elektronika')
    INTO Serwisant (PracownikID, Specjalizacje) VALUES (26, 'Przeglądy')
    INTO Serwisant (PracownikID, Specjalizacje) VALUES (30, 'Skrzynia biegów')
SELECT * FROM dual;

-- Insert 29 entries into Tasks
INSERT ALL
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (1, 1, 'Oddzwonienie do klienta')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (2, 2, 'Finalizacja zamówienia')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (3, 3, 'Wymiana hamulców w pojeździe klienta')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (4, 4, 'Prezentacja samochodu')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (5, 6, 'Założenie opon zimowych')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (6, 17, 'Przedstawienie oferty klientowi')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (7, 5, 'Serwis pojazdu klienta')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (8, 23, 'Przygotowanie oferty')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (9, 10, 'Przygotowanie oferty')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (10, 29, 'Finalizacja zamówienia')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (11, 2, 'Przygotowanie oferty')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (12, 7, 'Wymiana sprzęgła')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (13, 13, 'Oddzwonienie do klienta')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (14, 1, 'Przedstawienie oferty klientowi')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (15, 14, 'Prezentacja samochodu')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (16, 1, 'Przygotowanie oferty')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (17, 30, 'Wymiana płynu w skrzyni biegów')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (18, 8, 'Finalizacja zamówienia')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (19, 28, 'Przygotowanie oferty')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (20, 15, 'Serwis pojazdu klienta')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (21, 12, 'Prezentacja samochodu')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (22, 10, 'Przygotowanie oferty')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (23, 19, 'Serwis pojazdu klienta')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (24, 30, 'Diagnoza skrzyni biegów')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (25, 4, 'Prezentacja samochodu')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (26, 26, 'Wstępny przegląd pojazdu klienta')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (27, 24, 'Diagnoza wyświetlacza')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (28, 16, 'Wstępny przegląd pojazdu klienta')
    INTO Zadania (ZadanieID, PracownikID, Opis) VALUES (29, 22, 'Serwis pojazdu klienta')
SELECT * FROM dual;

-- Insert 15 entries into Customer
INSERT ALL
    INTO Klient (KlientID, Imie, Nazwisko, Email, PESEL, Telefon) VALUES (1, 'Jakub', 'Nowak', 'jakub.nowak@email.com', 88082261274, '345-678-901')
    INTO Klient (KlientID, Imie, Nazwisko, Email, PESEL, Telefon) VALUES (2, 'Anna', 'Kowalska', 'anna.kowalska@email.com', 98072647959, '456-789-012')
    INTO Klient (KlientID, Imie, Nazwisko, Email, PESEL, Telefon) VALUES (3, 'Mateusz', 'Wiśniewski', 'mateusz.wisniewski@email.com', 68050359239, '567-890-123')
    INTO Klient (KlientID, Imie, Nazwisko, Email, PESEL, Telefon) VALUES (4, 'Zuzanna', 'Jankowska', 'zuzanna.jankowska@email.com', 54012815983, '678-901-234')
    INTO Klient (KlientID, Imie, Nazwisko, Email, PESEL, Telefon) VALUES (5, 'Jan', 'Kowalczyk', 'jan.kowalczyk@email.com', 90020637551, '789-012-345')
    INTO Klient (KlientID, Imie, Nazwisko, Email, PESEL, Telefon) VALUES (6, 'Maja', 'Nowakowska', 'maja.nowakowska@email.com', 63020119532, '890-123-456')
    INTO Klient (KlientID, Imie, Nazwisko, Email, PESEL, Telefon) VALUES (7, 'Piotr', 'Woźniak', 'piotr.wozniak@email.com', 62061174753, '901-234-567')
    INTO Klient (KlientID, Imie, Nazwisko, Email, PESEL, Telefon) VALUES (8, 'Alicja', 'Krawczyk', 'alicja.krawczyk@email.com', 55070789795, '123-456-789')
    INTO Klient (KlientID, Imie, Nazwisko, Email, PESEL, Telefon) VALUES (9, 'Filip', 'Lewandowski', 'filip.lewandowski@email.com', 90060176629, '234-567-890')
    INTO Klient (KlientID, Imie, Nazwisko, Email, PESEL, Telefon) VALUES (10, 'Zofia', 'Dąbrowska', 'zofia.dabrowska@email.com', 76110569568, '345-678-901')
    INTO Klient (KlientID, Imie, Nazwisko, Email, PESEL, Telefon) VALUES (11, 'Oliwia', 'Zielińska', 'oliwia.zielinska@email.com', 60072686711, '456-789-012')
    INTO Klient (KlientID, Imie, Nazwisko, Email, PESEL, Telefon) VALUES (12, 'Kacper', 'Szymański', 'kacper.szymanski@email.com', 82101762366, '567-890-123')
    INTO Klient (KlientID, Imie, Nazwisko, Email, PESEL, Telefon) VALUES (13, 'Maja', 'Kaczmarek', 'maja.kaczmarek@email.com', 96111687962, '123-654-789')
    INTO Klient (KlientID, Imie, Nazwisko, Email, PESEL, Telefon) VALUES (14, 'Adam', 'Mazurek', 'adam.mazurek@email.com', 65082855476, '234-576-890')
    INTO Klient (KlientID, Imie, Nazwisko, Email, PESEL, Telefon) VALUES (15, 'Michał', 'Duda', 'michal.duda@email.com', 51050911387, '456-789-014')
SELECT * FROM dual;

-- Insert 15 entries into Transaction
INSERT ALL
    INTO Transakcja (TransakcjaID, SamochodID, KlientID, PracownikID, Typ, Data) VALUES (1, 14, 15, 29, 'Zakup', date'2023-04-10')
    INTO Transakcja (TransakcjaID, SamochodID, KlientID, PracownikID, Typ, Data) VALUES (2, 3, 1, 11, 'Serwis', date'2023-05-13')
    INTO Transakcja (TransakcjaID, SamochodID, KlientID, PracownikID, Typ, Data) VALUES (3, 15, 3, 8, 'Zakup', date'2023-06-15')
    INTO Transakcja (TransakcjaID, SamochodID, KlientID, PracownikID, Typ, Data) VALUES (4, 13, 2, 15, 'Serwis', date'2023-07-17')
    INTO Transakcja (TransakcjaID, SamochodID, KlientID, PracownikID, Typ, Data) VALUES (5, 11, 12, 26, 'Serwis', date'2023-08-22')
    INTO Transakcja (TransakcjaID, SamochodID, KlientID, PracownikID, Typ, Data) VALUES (6, 7, 10, 5, 'Serwis', date'2023-09-28')
    INTO Transakcja (TransakcjaID, SamochodID, KlientID, PracownikID, Typ, Data) VALUES (7, 8, 5, 26, 'Serwis', date'2023-10-30')
    INTO Transakcja (TransakcjaID, SamochodID, KlientID, PracownikID, Typ, Data) VALUES (8, 9, 8, 30, 'Serwis', date'2023-11-06')
    INTO Transakcja (TransakcjaID, SamochodID, KlientID, PracownikID, Typ, Data) VALUES (9, 4, 11, 16, 'Serwis', date'2023-12-11')
    INTO Transakcja (TransakcjaID, SamochodID, KlientID, PracownikID, Typ, Data) VALUES (10, 1, 6, 2, 'Zakup', date'2024-01-17')
    INTO Transakcja (TransakcjaID, SamochodID, KlientID, PracownikID, Typ, Data) VALUES (11, 12, 5, 9, 'Serwis', date'2024-02-23')
    INTO Transakcja (TransakcjaID, SamochodID, KlientID, PracownikID, Typ, Data) VALUES (12, 5, 14, 3, 'Serwis', date'2024-03-27')
    INTO Transakcja (TransakcjaID, SamochodID, KlientID, PracownikID, Typ, Data) VALUES (13, 15, 3, 26, 'Serwis', date'2024-04-30')
    INTO Transakcja (TransakcjaID, SamochodID, KlientID, PracownikID, Typ, Data) VALUES (14, 10, 15, 9, 'Serwis', date'2024-05-09')
    INTO Transakcja (TransakcjaID, SamochodID, KlientID, PracownikID, Typ, Data) VALUES (15, 2, 7, 29, 'Serwis', date'2024-06-12')
SELECT * FROM dual;

-- Insert 6 entries into Discount
INSERT ALL
    INTO Rabat (TransakcjaID, KlientID, Kwota, Procent, Rodzaj) VALUES (5, 12, NULL, 5, 'Procent')
    INTO Rabat (TransakcjaID, KlientID, Kwota, Procent, Rodzaj) VALUES (6, 10, 125, NULL, 'Kwota')
    INTO Rabat (TransakcjaID, KlientID, Kwota, Procent, Rodzaj) VALUES (7, 5, 300, NULL, 'Kwota')
    INTO Rabat (TransakcjaID, KlientID, Kwota, Procent, Rodzaj) VALUES (10, 6, 150, NULL, 'Kwota')
    INTO Rabat (TransakcjaID, KlientID, Kwota, Procent, Rodzaj) VALUES (13, 3, NULL, 100, 'Procent')
    INTO Rabat (TransakcjaID, KlientID, Kwota, Procent, Rodzaj) VALUES (14, 15, NULL, 20, 'Procent')
SELECT * FROM dual;

-- Insert 15 entries into Payment
INSERT ALL
    INTO Platnosc (PlatnoscID, TransakcjaID, Wartosc, Data) VALUES (1, 1, 1340000, date'2023-04-10')
    INTO Platnosc (PlatnoscID, TransakcjaID, Wartosc, Data) VALUES (2, 2, 450, date'2023-05-13')
    INTO Platnosc (PlatnoscID, TransakcjaID, Wartosc, Data) VALUES (3, 3, 560000, date'2023-06-15')
    INTO Platnosc (PlatnoscID, TransakcjaID, Wartosc, Data) VALUES (4, 4, 350, date'2023-07-17')
    INTO Platnosc (PlatnoscID, TransakcjaID, Wartosc, Data) VALUES (5, 5, 1200, date'2023-08-22')
    INTO Platnosc (PlatnoscID, TransakcjaID, Wartosc, Data) VALUES (6, 6, 1200, date'2023-09-28')
    INTO Platnosc (PlatnoscID, TransakcjaID, Wartosc, Data) VALUES (7, 7, 1200, date'2023-10-30')
    INTO Platnosc (PlatnoscID, TransakcjaID, Wartosc, Data) VALUES (8, 8, 1000, date'2023-11-06')
    INTO Platnosc (PlatnoscID, TransakcjaID, Wartosc, Data) VALUES (9, 9, 1200, date'2023-12-11')
    INTO Platnosc (PlatnoscID, TransakcjaID, Wartosc, Data) VALUES (10, 10, 96000, date'2024-01-17')
    INTO Platnosc (PlatnoscID, TransakcjaID, Wartosc, Data) VALUES (11, 11, 760, date'2024-02-23')
    INTO Platnosc (PlatnoscID, TransakcjaID, Wartosc, Data) VALUES (12, 12, 1300, date'2024-03-27')
    INTO Platnosc (PlatnoscID, TransakcjaID, Wartosc, Data) VALUES (13, 13, 3300, date'2024-04-30')
    INTO Platnosc (PlatnoscID, TransakcjaID, Wartosc, Data) VALUES (14, 14, 14200, date'2024-05-09')
    INTO Platnosc (PlatnoscID, TransakcjaID, Wartosc, Data) VALUES (15, 15, 44000, date'2024-06-12')
SELECT * FROM dual;
