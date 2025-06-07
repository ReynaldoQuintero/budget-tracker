import { RowDataPacket } from "mysql2";

export interface ReceivableResult extends RowDataPacket {
  receivable_id: number;
  amount: number;
  due_date: string;
  description: string;
  paid: boolean;
  user_id: number;
  subcategory_id: number;
  account_id: number;
}

export interface ReceivableInput {
  receivable_id: number;
  amount: number;
  due_date: string;
  description: string;
  paid: boolean;
  user_id: number;
  subcategory_id: number;
  account_id: number;
}
