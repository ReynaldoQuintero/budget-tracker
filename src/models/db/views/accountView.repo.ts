import mysql from 'mysql2/promise';

export async function createBudgetOverviewView(connection: mysql.Connection) {
  // BudgetOverview View
  await connection.query(`
            CREATE OR REPLACE VIEW BudgetOverview AS
            SELECT
                b.month,
                sc.subcategory_name,
                acc.account_id,
                sc.budgeted_amount,
                COALESCE(SUM(e.amount), 0) AS total_expenses,
                COALESCE(SUM(r.amount), 0) AS total_receivables,
                (COALESCE(SUM(r.amount), 0) - COALESCE(SUM(e.amount), 0)) AS net_flow,
                (sc.budgeted_amount - IFNULL(SUM(e.amount), 0)) AS difference 
            FROM 
                Budgets b
            JOIN 
                Subcategories sc ON b.budget_id = sc.budget_id
            LEFT JOIN 
                Expense_Subcategories es ON sc.subcategory_id = es.subcategory_id
            LEFT JOIN 
                Expenses e ON es.expense_id = e.expense_id AND MONTH(e.expense_date) = MONTH(b.month)
            LEFT JOIN 
                Accounts acc ON e.account_id = acc.account_id
            LEFT JOIN
                Receivables r ON r.account_id = acc.account_id
            GROUP BY 
                b.month, sc.subcategory_name, acc.account_id, sc.budgeted_amount;
      `);
}
