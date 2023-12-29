-- Create Manufacturer Table
CREATE TABLE Producent (
    ProducentID NUMBER PRIMARY KEY,
    Nazwa VARCHAR2(255) NOT NULL,
    Kraj VARCHAR2(50)
);

-- Create Car Table
CREATE TABLE Samochod (
    SamochodID NUMBER PRIMARY KEY,
    ProducentID NUMBER REFERENCES Producent(ProducentID),
    Marka VARCHAR2(255) NOT NULL,
    Model VARCHAR2(255) NOT NULL,
    Rocznik NUMBER NOT NULL,
    VIN VARCHAR2(50) UNIQUE NOT NULL,
    Cena NUMBER NOT NULL,
    Wykonczenie NUMBER NOT NULL
);

-- Create Options Table
CREATE TABLE Opcje (
    OpcjaID NUMBER PRIMARY KEY,
    SamochodID NUMBER REFERENCES SamochodID(SamochodID),
    Nazwa VARCHAR2(255) UNIQUE NOT NULL,
    Cena NUMBER
);

-- Create ServiceRequest Table
CREATE TABLE SerwisZgloszenie (
    ZgloszenieID NUMBER PRIMARY KEY,
    SamochodID NUMBER REFERENCES Samochod(SamochodID),
    Opis VARCHAR2(500),
    Status VARCHAR2(50)
);

-- Create Employee Table
CREATE TABLE Pracownik (
    PracownikID NUMBER PRIMARY KEY,
    Imie VARCHAR2(50) NOT NULL,
    Nazwisko VARCHAR2(50) NOT NULL,
    Zadania VARCHAR2(500)
);

-- Create Service Table
CREATE TABLE Serwis (
    SerwisID NUMBER PRIMARY KEY,
    ZgloszenieID NUMBER REFERENCES SerwisZgloszenie(ZgloszenieID),
    PracownikID NUMBER REFERENCES Pracownik(PracownikID),
    Data DATE
);

-- Create Salesperson Table
CREATE TABLE Sprzedawca (
    PracownikID NUMBER PRIMARY KEY REFERENCES Pracownik(PracownikID),
    IloscTransakcji NUMBER
);

-- Create Mechanic Table
CREATE TABLE Serwisant (
    PracownikID NUMBER PRIMARY KEY REFERENCES Pracownik(PracownikID),
    Specjalizacje VARCHAR2(500)
);

-- Create Tasks Table
CREATE TABLE Zadania (
    ZadanieID NUMBER PRIMARY KEY,
    PracownikID NUMBER REFERENCES Pracownik(PracownikID),
    Nazwa VARCHAR2(255)
);

-- Create Customer Table
CREATE TABLE Klient (
    KlientID NUMBER PRIMARY KEY,
    Imie VARCHAR2(50) NOT NULL,
    Nazwisko VARCHAR2(50) NOT NULL,
    Email VARCHAR2(255) NOT NULL,
    PESEL NUMBER(11) UNIQUE NOT NULL,
    Telefon VARCHAR2(20)
);

-- Create Transaction Table
CREATE TABLE Transakcja (
    TransakcjaID NUMBER PRIMARY KEY,
    SamochodID NUMBER REFERENCES Samochod(SamochodID),
    KlientID NUMBER REFERENCES Klient(KlientID),
    PracownikID NUMBER REFERENCES Pracownik(PracownikID),
    Data DATE
);

-- Create Discount Table
CREATE TABLE Rabat (
    KlientID NUMBER REFERENCES Klient(KlientID),
    TransakcjaID NUMBER REFERENCES Transakcja(TransakcjaID),
    Ilosc NUMBER,
    Procent NUMBER,
    PRIMARY KEY (KlientID, TransakcjaID)
);

-- Create Payment Table
CREATE TABLE Platnosc (
    PlatnoscID NUMBER PRIMARY KEY,
    TransakcjaID NUMBER REFERENCES Transakcja(TransakcjaID),
    Wartosc NUMBER,
    Data DATE
);
