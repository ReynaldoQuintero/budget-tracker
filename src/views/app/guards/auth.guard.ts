import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!environment.guards) {
      return true;
    }
    if (this.authService.user.user_id) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
