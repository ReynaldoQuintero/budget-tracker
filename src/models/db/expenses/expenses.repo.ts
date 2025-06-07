import mysql from "mysql2/promise";

export async function createExpensesTable(connection: mysql.Connection) {
  await connection.query(`
        CREATE TABLE IF NOT EXISTS Expenses (
          expense_id INT PRIMARY KEY AUTO_INCREMENT,
          account_id INT NOT NULL,
          expense_date DATE NOT NULL,
          amount DECIMAL(10, 2) NOT NULL,
          user_id INT NOT NULL,
          FOREIGN KEY (account_id) REFERENCES Accounts(account_id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
        );
    `);
}

export async function createExpenseSubcategoriesTable(
  connection: mysql.Connection
) {
  await connection.query(`
      CREATE TABLE IF NOT EXISTS Expense_Subcategories (
        expense_id INT NOT NULL,
        subcategory_id INT NOT NULL,
        PRIMARY KEY (expense_id, subcategory_id),
        FOREIGN KEY (expense_id) REFERENCES Expenses(expense_id) ON DELETE CASCADE,
        FOREIGN KEY (subcategory_id) REFERENCES Subcategories(subcategory_id) ON DELETE CASCADE
      );
    `);
}
