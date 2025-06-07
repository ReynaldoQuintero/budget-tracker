import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  constructor(private authService: AuthService) {}
  loginWithGoogle() {
    // Dynamically set the redirect URL
    this.authService.googleLogin();
  }
}
