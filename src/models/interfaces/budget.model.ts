import { RowDataPacket } from "mysql2";

export interface BudgetResult extends RowDataPacket {
  month: string;
  user_id: number;
}

export interface BudgetInput {
  month?: string;
  user_id?: number;
}
