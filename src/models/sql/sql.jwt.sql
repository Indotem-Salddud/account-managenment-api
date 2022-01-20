
-- Contains JWT refresh tokens
CREATE TABLE `JWTRefreshTokens` IF NOT EXISTS (
    customerID INT PRIMARY KEY NOT NULL,
    refreshToken BINARY(32), /*TODO: is 256 bytes ok?*/
    expiration TIMESTAMP,
    granted TIMESTAMP,
    status INT,
    FOREIGN KEY (customerID) REFERENCE customers(id),
) ENGINE = InnoDB,
CHARSET = utf8,
COLLATE = utf8_spanish2_ci;