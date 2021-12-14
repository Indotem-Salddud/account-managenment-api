-- Relation Many to Many Accounts -> Dependents
CREATE TABLE `AccountDependentsRelation` (
    accountID INT NOT NULL,
    dependentID INT NOT NULL,
    FOREIGN KEY (accountID) REFERENCE Accounts(id),
    FOREIGN KEY (dependentID) REFERENCE Dependents(id),
    UNIQUE (accountID, dependentID)
);