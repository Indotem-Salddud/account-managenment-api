
-- Contains JWT refresh tokens
CREATE TABLE `JWTRefreshTokens` IF NOT EXISTS (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customerID INT PRIMARY KEY NOT NULL,
    expiration TIMESTAMP,
    granted TIMESTAMP,
    status INT,
    FOREIGN KEY (customerID) REFERENCE customers(id),
) ENGINE = InnoDB,
CHARSET = utf8,
COLLATE = utf8_spanish2_ci;