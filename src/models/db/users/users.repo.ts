import mysql from "mysql2/promise";
import { UserInput, UserResult } from "../../interfaces/user.model";
import { pool } from "..";

export async function createUsersTable(connection: mysql.Connection) {
  await connection.query(`
        CREATE TABLE IF NOT EXISTS Users (
          user_id INT PRIMARY KEY AUTO_INCREMENT,
          google_id VARCHAR(255) UNIQUE,
          email VARCHAR(255) UNIQUE,
          name VARCHAR(255) NOT NULL,
          role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
}

export async function insertUser(user: Partial<UserInput>) {
  return pool.query(
    "INSERT INTO Users (google_id, email, name, role) VALUES (?, ?, ?, ?);",
    [user.google_id, user.email, user.name, user.role]
  );
}

export async function queryUserByEmail(email: string) {
  return pool.query<UserResult[]>("SELECT * FROM Users WHERE email = ?", [
    email,
  ]);
}

export async function queryUserByGoogleId(google_id: string) {
  return pool.query<UserResult[]>("SELECT * FROM Users WHERE google_id = ?", [
    google_id,
  ]);
}

export async function queryUserByUserId(user_id: number) {
  return pool.query<UserResult[]>("SELECT * FROM Users WHERE user_id = ?", [
    user_id,
  ]);
}
