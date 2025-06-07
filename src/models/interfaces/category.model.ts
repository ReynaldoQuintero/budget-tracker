import { RowDataPacket } from 'mysql2';

export interface CategoryResult extends RowDataPacket {
  category_id: number;
  category_name: string;
  budget_id: number;
  user_id: number;
  created_at: string;
}

export interface CategoryInput {
  category_id: number;
  category_name: string;
  budget_id: number;
  user_id: number;
  created_at: string;
}
