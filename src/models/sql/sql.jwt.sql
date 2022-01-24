-- Contains JWT refresh tokens
CREATE TABLE `JWTRefreshTokens` IF NOT EXISTS (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL
    customerID INT NOT NULL,
    refreshToken BINARY(32), /*TODO: is 256 bytes ok?*/
    revoqued INT
    expiredAt TIMESTAMP,
    updatedAt TIMESTAMP,
    createdAt TIMESTAMP,
    FOREIGN KEY (customerID) REFERENCE customers(id),
) ENGINE = InnoDB,
CHARSET = utf8,
COLLATE = utf8_spanish2_ci; 