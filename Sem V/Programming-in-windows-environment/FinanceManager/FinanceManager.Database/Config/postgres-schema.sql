CREATE TYPE TransactionType as ENUM ('Income', 'Expense');

CREATE TABLE Users (
    ID uuid PRIMARY KEY NOT NULL,
    Balance decimal(12, 2)
);

CREATE TABLE TransactionCategories (
    ID integer PRIMARY KEY NOT NULL,
    Name varchar(50)
);

CREATE TABLE Transactions (
    ID bigint PRIMARY KEY NOT NULL,
    UserID uuid REFERENCES Users (ID) ON UPDATE CASCADE,
    CategoryID integer REFERENCES TransactionCategories (ID),
    Type TransactionType,
    Date TIMESTAMP NOT NULL,
    Description varchar(255),
    Amount decimal(12, 2),
    Note varchar(255)
);
CREATE INDEX idx_transactions_userid ON Transactions(UserID);

CREATE TABLE FinancialGoals (
    ID bigint PRIMARY KEY NOT NULL,
    UserID uuid REFERENCES Users (ID) ON UPDATE CASCADE,
    Description varchar(255),
    CurrentAmount decimal(12 ,2),
    GoalAmount decimal(12, 2)
);
CREATE INDEX idx_financialgoals_userid ON FinancialGoals(UserID);

CREATE TABLE Reports (
    ID uuid PRIMARY KEY NOT NULL,
    UserID uuid REFERENCES Users (ID) ON UPDATE CASCADE,
    DateCreated TIMESTAMP,
    Criteria varchar(255)
);
CREATE INDEX idx_reports_userid ON Reports(UseriD);

CREATE TABLE Alerts (
    ID uuid PRIMARY KEY NOT NULL,
    UserID uuid REFERENCES Users (ID) ON UPDATE CASCADE,
    Threshold decimal(12, 2),
    AlertMessage varchar(255)
);
CREATE INDEX idx_alerts_userid ON Alerts(UserID);
