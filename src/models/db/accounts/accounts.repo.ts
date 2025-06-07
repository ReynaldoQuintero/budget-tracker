import mysql from "mysql2/promise";

export async function createAccountsTable(connection: mysql.Connection) {
  // Accounts Table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS Accounts (
      account_id INT PRIMARY KEY AUTO_INCREMENT,
      account_name VARCHAR(100) NOT NULL,
      balance DECIMAL(10, 2) DEFAULT 0.00,
      user_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
    );
  `);
}
