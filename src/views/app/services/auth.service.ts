import {
  inject,
  Injectable,
  makeStateKey,
  REQUEST_CONTEXT,
  TransferState,
} from '@angular/core';
import { UserResult } from '../../../models/interfaces/user.model';

const USER_KEY = makeStateKey<any>('user');

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _user: UserResult;
  constructor() {
    const transferState = inject(TransferState);
    const USER: any = inject(REQUEST_CONTEXT, {
      optional: true,
    });

    if (USER) {
      transferState.set(USER_KEY, USER.user);
    }

    this._user = transferState.get(USER_KEY, {});
  }

  get user(): UserResult {
    return this._user;
  }

  googleLogin() {
    window.location.href = '/api/auth/google';
  }

  logout() {
    window.location.href = '/api/auth/logout';
  }
}
