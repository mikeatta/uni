-- Create a procedure for adding a new car to the database
CREATE OR REPLACE PROCEDURE DodajSamochod (
    pMarka VARCHAR2,
    pModel VARCHAR2,
    pKraj VARCHAR2,
    pRocznik NUMBER,
    pVIN VARCHAR2,
    pCena NUMBER,
    pOpcjeID SYS.ODCINUMBERLIST
) AS
    vProducentID NUMBER;
    vSamochodID NUMBER;
BEGIN
    -- Check if the manufacturer already exists
    BEGIN
        SELECT ProducentID
        INTO vProducentID
        FROM Producent
        WHERE Nazwa = pMarka;

    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            -- If the manufacturer does not exist, add a new one
            INSERT INTO Producent (Nazwa, Kraj)
            VALUES (pMarka, pKraj)
            RETURNING ProducentID INTO vProducentID;
    END;

    -- Add the new car
    INSERT INTO Samochod (ProducentID, Marka, Model, Rocznik, VIN, Cena)
    VALUES (vProducentID, pMarka, pModel, pRocznik, pVIN, pCena)
    RETURNING SamochodID INTO vSamochodID;

    -- Add options to the new car
    FOR i IN 1..pOpcjeID.COUNT LOOP
        INSERT INTO SamochodOpcje (SamochodID, OpcjaID)
        VALUES (vSamochodID, pOpcjeID(i));
    END LOOP;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Dodano nowy samochód! ID: ' || vSamochodID);
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END DodajSamochod;

-- Assign a task to the employee with the lowest current task count
CREATE OR REPLACE PROCEDURE PrzypiszZadanie (
    pStanowisko VARCHAR2,
    pZadanieOpis VARCHAR2
) AS
    vPracownikID NUMBER;
BEGIN
    -- Select the employee with lowest task count and the specified position
    SELECT PracownikID
    INTO vPracownikID
    FROM (
        SELECT Zadania.PracownikID, COUNT(*) AS IloscZadan
        FROM Zadania
        JOIN Pracownik ON Pracownik.PracownikID = Zadania.PracownikID
        WHERE Pracownik.Stanowisko = pStanowisko
        GROUP BY Zadania.PracownikID
        ORDER BY IloscZadan ASC
    )
    WHERE ROWNUM = 1;

    -- Insert a new task and associate it with the selected employee
    INSERT INTO Zadania (PracownikID, Opis)
    VALUES (vPracownikID, pZadanieOpis);

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Pomyślnie przypisano zadanie!');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END PrzypiszZadanie;

-- Assign a task to a specific employee with the lowest current task count
CREATE OR REPLACE PROCEDURE PrzypiszZadanieDoPracownika (
    pStanowisko VARCHAR2,
    pZadanieOpis VARCHAR2,
    pPracownikID OUT NUMBER
) AS
BEGIN
    -- Select the employee with lowest task count and the specified position
    SELECT PracownikID
    INTO pPracownikID
    FROM (
        SELECT Zadania.PracownikID, COUNT(*) AS IloscZadan
        FROM Zadania
        JOIN Pracownik ON Pracownik.PracownikID = Zadania.PracownikID
        WHERE Pracownik.Stanowisko = pStanowisko
        GROUP BY Zadania.PracownikID
        ORDER BY IloscZadan ASC
    )
    WHERE ROWNUM = 1;

    -- Insert a new task and associate it with the selected employee
    INSERT INTO Zadania (PracownikID, Opis)
    VALUES (pPracownikID, pZadanieOpis);

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Pomyślnie przypisano zadanie do pracownika ID: || pPracownikID');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END PrzypiszZadanieDoPracownika;

-- Create a procedure for adding a purchase transaction
CREATE OR REPLACE PROCEDURE DodajTransakcjeZakupu(
    pSamochodID NUMBER,
    pKlientID NUMBER,
    pWartosc NUMBER
) AS
    vTransakcjaID NUMBER;
    vPracownikID NUMBER;
BEGIN
    -- Assing a salesperson to finalize the transaction
    PrzypiszZadanieDoPracownika('Sprzedawca', 'Finalizacja transakcji', vPracownikID);

    -- Insert into Transaction
    INSERT INTO Transakcja (SamochodID, KlientID, PracownikID, Typ, Data)
    VALUES (pSamochodID, pKlientID, vPracownikID, 'Zakup', SYSDATE)
    RETURNING TransakcjaID INTO vTransakcjaID;

    -- Insert into Payment
    INSERT INTO Platnosc (TransakcjaID, Wartosc, Data)
    VALUES (vTransakcjaID, pWartosc, SYSDATE);

    COMMIT;
END DodajTransakcjeZakupu;

-- Create a trigger for automatically adding new employees to position tables
CREATE OR REPLACE TRIGGER DodajPracownikaDoStanowiska
AFTER INSERT ON Pracownik
FOR EACH ROW
BEGIN
    IF :NEW.Stanowisko = 'Sprzedawca' THEN
        INSERT INTO Sprzedawca (PracownikID, IloscTransakcji) VALUES (:NEW.PracownikID, 0);
    ELSIF :NEW.Stanowisko = 'Serwisant' THEN
        INSERT INTO Serwisant (PracownikID, Specjalizacje) VALUES (:NEW.PracownikID, NULL);
    END IF;
END;

-- Assign a discount to a transaction
CREATE OR REPLACE NONEDITIONABLE TRIGGER PrzypiszRabat
AFTER INSERT ON Rabat
FOR EACH ROW
DECLARE
    vRabatWartosc NUMBER;
BEGIN
    -- Calculate the discount amount based on the discount type
    SELECT CASE
            WHEN :NEW.Rodzaj = 'Procent' THEN :NEW.Kwota * (:NEW.Procent / 100)
            WHEN :NEW.Rodzaj = 'Kwota' THEN :NEW.Kwota
            ELSE 0 -- default to 0 in case of missing values or unknown discount type
        END
    INTO vRabatWartosc
    FROM dual;

    -- If the discount exists, update the payment amount
    IF vRabatWartosc IS NOT NULL THEN
        UPDATE Platnosc
        SET Wartosc = Wartosc - vRabatWartosc
        WHERE TransakcjaID IN (
            SELECT TransakcjaID
            FROM Transakcja
            WHERE TransakcjaID = :NEW.TransakcjaID
        );
    END IF;
END PrzypiszRabat;

-- Calculate the total option price and update the car price
CREATE OR REPLACE TRIGGER ObliczWartoscOpcji
AFTER INSERT ON SamochodOpcje
FOR EACH ROW
DECLARE
    vWartoscOpcji NUMBER := 0;
BEGIN
    -- Calculate total option price
    SELECT SUM(Cena)
    INTO vWartoscOpcji
    FROM Opcje
    WHERE OpcjaID IN (:NEW.OpcjaID);

    -- Update the car price
    UPDATE Samochod
    SET Cena = Cena + vWartoscOpcji
    WHERE SamochodID = :NEW.SamochodID;
END ObliczWartoscOpcji;
