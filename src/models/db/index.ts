import mysql from 'mysql2/promise';
import { createUsersTable } from './users/users.repo';
import { createAccountsTable } from './accounts/accounts.repo';
import {
  createExpensesTable,
  createExpenseSubcategoriesTable,
} from './expenses/expenses.repo';
import { createCategoriesTable } from './categories/categories.repo';
import { createBudgetOverviewView } from './views/accountView.repo';
import dotenv from 'dotenv';
import { createSubcategoriesTable } from './subcategories/subcategories.repo';
import { createBudgetsTable } from './budgets/budgets.repo';
import { createReceivablesTable } from './receivables/receivables.repo';

dotenv.config();

// Load DB configurations from .env
const dbConfig = {
  host: process.env['DB_HOST'],
  user: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
  port: process.env['DB_NAME'],
};

export const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port ? Number(dbConfig.port) : 3306
});

// Connect to the MySQL database and initialize schema
export async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
    });

    // Create the database if it doesn't exist
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${dbConfig.database};`
    );
    await connection.changeUser({ database: dbConfig.database });

    // Create tables
    await createTables(connection);

    // Create views
    await createViews(connection);

    connection.end();
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
}

export async function createConnectionPool() {
  mysql.createPool({
    connectionLimit: 10,
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
  });
}

// Function to create the tables
async function createTables(connection: mysql.Connection) {
  // User Table
  await createUsersTable(connection);

  // Budgets
  await createBudgetsTable(connection);

  // Accounts Table
  await createAccountsTable(connection);

  // Categories Table
  await createCategoriesTable(connection);

  // Subcategories Table
  await createSubcategoriesTable(connection);

  // Expenses Table
  await createExpensesTable(connection);

  // Expense_Subcategories Table
  await createExpenseSubcategoriesTable(connection);

  // Receivables Table
  await createReceivablesTable(connection);

  console.log('Database tables created or already exist.');
}

// Function to create the tables
async function createViews(connection: mysql.Connection) {
  // Budget Overview View
  await createBudgetOverviewView(connection);

  console.log('Database views created or already exist.');
}
