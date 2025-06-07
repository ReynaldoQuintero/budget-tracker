import { JwtPayload } from 'jsonwebtoken';
import { UserInput } from '../models/interfaces/user.model';
import { Session } from 'express-session';

declare global {
  namespace Express {
    interface User extends UserInput {}
  }
}

declare module 'express-session' {
  interface SessionData {
    auth_token?: string;
  }
}

interface ExtendedSession extends Session {
  auth_token?: string;
}
