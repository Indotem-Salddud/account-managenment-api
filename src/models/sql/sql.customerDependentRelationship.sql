-- Relation Many to Many customers -> Dependents
CREATE TABLE `CustomerDependentsRelation` IF NOT EXISTS (
    customerID INT NOT NULL,
    dependentID INT NOT NULL,
    FOREIGN KEY (customerID) REFERENCE customers(id),
    FOREIGN KEY (dependentID) REFERENCE Dependents(id),
    UNIQUE (customerID, dependentID)
);