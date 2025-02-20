-- Create Manufacturer Table
CREATE TABLE Producent (
    ProducentID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Nazwa VARCHAR2(255) NOT NULL,
    Kraj VARCHAR2(50)
);

-- Create Car Table
CREATE TABLE Samochod (
    SamochodID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ProducentID NUMBER REFERENCES Producent(ProducentID),
    Marka VARCHAR2(255) NOT NULL,
    Model VARCHAR2(255) NOT NULL,
    Rocznik NUMBER NOT NULL,
    VIN VARCHAR2(50) UNIQUE NOT NULL,
    Cena NUMBER(10,2) CHECK (Cena >= 0) NOT NULL
);

-- Create Options Table
CREATE TABLE Opcje (
    OpcjaID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Nazwa VARCHAR2(255) NOT NULL,
    Cena NUMBER(7,2) CHECK (Cena >= 0) NOT NULL
);

-- Create CarOptions Table
CREATE TABLE SamochodOpcje (
    SamochodID NUMBER,
    OpcjaID NUMBER,
    PRIMARY KEY (SamochodID, OpcjaID),
    FOREIGN KEY (SamochodID) REFERENCES Samochod(SamochodID),
    FOREIGN KEY (OpcjaID) REFERENCES Opcje(OpcjaID)
);

-- Create ServiceRequest Table
CREATE TABLE SerwisZgloszenie (
    ZgloszenieID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    SamochodID NUMBER REFERENCES Samochod(SamochodID),
    Opis VARCHAR2(500),
    Status VARCHAR2(50)
);

-- Create Employee Table
CREATE TABLE Pracownik (
    PracownikID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Imie VARCHAR2(50) NOT NULL,
    Nazwisko VARCHAR2(50) NOT NULL,
    Stanowisko VARCHAR2(50)
);

-- Create Service Table
CREATE TABLE Serwis (
    SerwisID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ZgloszenieID NUMBER REFERENCES SerwisZgloszenie(ZgloszenieID),
    PracownikID NUMBER REFERENCES Pracownik(PracownikID),
    Data DATE
);

-- Create Salesperson Table
CREATE TABLE Sprzedawca (
    PracownikID NUMBER PRIMARY KEY REFERENCES Pracownik(PracownikID),
    IloscTransakcji NUMBER CHECK (IloscTransakcji >= 0)
);

-- Create Mechanic Table
CREATE TABLE Serwisant (
    PracownikID NUMBER PRIMARY KEY REFERENCES Pracownik(PracownikID),
    Specjalizacje VARCHAR2(50)
);

-- Create Tasks Table
CREATE TABLE Zadania (
    ZadanieID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    PracownikID NUMBER REFERENCES Pracownik(PracownikID),
    Opis VARCHAR2(255)
);

-- Create Customer Table
CREATE TABLE Klient (
    KlientID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Imie VARCHAR2(50) NOT NULL,
    Nazwisko VARCHAR2(50) NOT NULL,
    Email VARCHAR2(255) NOT NULL,
    PESEL NUMBER(11) UNIQUE NOT NULL,
    Telefon VARCHAR2(20)
);

-- Create Transaction Table
CREATE TABLE Transakcja (
    TransakcjaID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    SamochodID NUMBER REFERENCES Samochod(SamochodID),
    KlientID NUMBER REFERENCES Klient(KlientID),
    PracownikID NUMBER REFERENCES Pracownik(PracownikID),
    Typ VARCHAR2(10) CHECK (Typ IN ('Zakup', 'Serwis')),
    Data DATE
);

-- Create Discount Table
CREATE TABLE Rabat (
    TransakcjaID NUMBER REFERENCES Transakcja(TransakcjaID),
    KlientID NUMBER REFERENCES Klient(KlientID),
    Kwota NUMBER(10, 2) CHECK (Kwota >= 0),
    Procent NUMBER(3) CHECK (Procent >= 0),
    Rodzaj VARCHAR2(10),
    PRIMARY KEY (TransakcjaID, KlientID)
);

-- Create Payment Table
CREATE TABLE Platnosc (
    PlatnoscID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    TransakcjaID NUMBER REFERENCES Transakcja(TransakcjaID),
    Wartosc NUMBER(11, 2) CHECK (Wartosc >= 0) NOT NULL,
    Data DATE
);
