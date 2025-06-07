import mysql from 'mysql2/promise';
import { BudgetInput, BudgetResult } from '../../interfaces/budget.model';
import { pool } from '..';

export async function createBudgetsTable(connection: mysql.Connection) {
  // Budgets Table
  await connection.query(`
        CREATE TABLE IF NOT EXISTS Budgets (
        budget_id INT PRIMARY KEY AUTO_INCREMENT,
        month DATE NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
        );
    `);
}

export async function insertBudget(budget: Partial<BudgetInput>) {
  return pool.query('INSERT INTO Budgets (month, user_id) VALUES (?, ?);', [
    budget.month,
    budget.user_id,
  ]);
}

export async function queryUserBudgets(user_id: number) {
  return pool.query<BudgetResult[]>('SELECT * FROM Budgets WHERE user_id = ?', [
    user_id,
  ]);
}
