-- Contains all dependen mixed with accounts
CREATE TABLE `Dependents` (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    direction VARCHAR(255) NOT NULL COMMENT 'It should be a direction used JSON Format file',
    status TINYINT(1) DEFAULT 1 NOT NULL COMMENT '0 - Inactive / 1 - Active',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB,
CHARSET = utf8,
COLLATE = utf8_spanish2_ci;