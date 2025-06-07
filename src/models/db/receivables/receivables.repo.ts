import mysql from "mysql2/promise";
import { ReceivableInput } from "../../interfaces/receivable.model";
import { pool } from "..";

export async function createReceivablesTable(connection: mysql.Connection) {
  await connection.query(`
        CREATE TABLE IF NOT EXISTS Receivables (
            receivable_id INT PRIMARY KEY AUTO_INCREMENT,
            amount DECIMAL(10, 2) NOT NULL,
            due_date DATE,
            note TEXT,
            paid BOOLEAN DEFAULT FALSE,
            user_id INT,
            subcategory_id INT,
            account_id INT,
            FOREIGN KEY (user_id) REFERENCES Users(user_id),
            FOREIGN KEY (subcategory_id) REFERENCES Subcategories(subcategory_id),
            FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
        );

    `);
}

export async function insertReceivable(receivable: Partial<ReceivableInput>) {
  return pool.query(
    "INSERT INTO Receivables (amount, due_date, description, user_id, subcategory_id, account_id) VALUES (?, ?, ?, ?, ?, ?, ?);",
    [
      receivable.amount,
      receivable.due_date,
      receivable.description,
      receivable.user_id,
      receivable.subcategory_id,
      receivable.account_id,
    ]
  );
}
