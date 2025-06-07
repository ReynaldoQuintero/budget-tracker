import mysql from "mysql2/promise";

export async function createSubcategoriesTable(connection: mysql.Connection) {
  await connection.query(`
          CREATE TABLE IF NOT EXISTS Subcategories (
            subcategory_id INT PRIMARY KEY AUTO_INCREMENT,
            subcategory_name VARCHAR(100) NOT NULL,
            category_id INT NOT NULL,
            budgeted_amount DECIMAL(10, 2) NOT NULL,
            budget_id INT NOT NULL,
            FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE CASCADE,
            FOREIGN KEY (budget_id) REFERENCES Budgets(budget_id) ON DELETE CASCADE
        );
      `);
}
