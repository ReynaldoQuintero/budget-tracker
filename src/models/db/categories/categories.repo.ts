import mysql from "mysql2/promise";

export async function createCategoriesTable(connection: mysql.Connection) {
  await connection.query(`
        CREATE TABLE IF NOT EXISTS Categories (
          category_id INT PRIMARY KEY AUTO_INCREMENT,
          category_name VARCHAR(100) NOT NULL,
          budget_id INT NOT NULL,
          user_id INT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
          FOREIGN KEY (budget_id) REFERENCES Budgets(budget_id) ON DELETE CASCADE
        );
    `);
}
