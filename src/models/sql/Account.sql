CREATE DATABASE IndotemAccountManagenmentAPI;

--- Contains all accounts that are mainly for administrators
CREATE TABLE `Accounts` (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(200) NOT NULL UNIQUE KEY,
    email VARCHAR(150) NOT NULL UNIQUE KEY,
    phone VARCHAR(20) NOT NULL,
    direction VARCHAR(255) NOT NULL COMMENT 'It should be a direction used JSON Format file',  
    password VARCHAR(255) NOT NULL,
    status TINYINT(1) DEFAULT 1 NOT NULL COMMENT '0 - Inactive / 1 - Active',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB,
CHARSET = utf8,
COLLATE = utf8_spanish2_ci;

-- Contains all dependen mixed with accounts
CREATE TABLE `Dependents` (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    direction VARCHAR(255) NOT NULL COMMENT 'It should be a direction used JSON Format file',  
    status TINYINT(1) DEFAULT 1 NOT NULL COMMENT '0 - Inactive / 1 - Active',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)ENGINE = InnoDB,
CHARSET = utf8,
COLLATE = utf8_spanish2_ci;

-- Relation Many to Many Accounts -> Dependents
CREATE TABLE `AccountDependentsRelation` (
    accountID INT NOT NULL,
    dependentID INT NOT NULL,
    FOREIGN KEY (accountID) REFERENCE Accounts(id),
    FOREIGN KEY (dependentID) REFERENCE Dependents(id),
    UNIQUE (accountID, dependentID)
);