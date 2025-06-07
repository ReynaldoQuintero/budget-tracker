import { RowDataPacket } from 'mysql2';

export enum UserRoleEnum {
  user = 'user',
  admin = 'admin',
}

export interface UserResult extends RowDataPacket {
  user_id: number;
  role: UserRoleEnum;
  google_id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface UserInput {
  user_id: number;
  role: UserRoleEnum;
  google_id: string;
  email: string;
  name: string;
  created_at: string;
}
