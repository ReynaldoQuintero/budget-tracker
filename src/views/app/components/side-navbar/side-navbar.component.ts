import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-side-navbar',
  imports: [MatIconModule, MatButtonModule, MatSidenavModule, MatListModule, RouterModule, CommonModule, MatMenuModule],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss'
})
export class SideNavbarComponent {
  accounts = [
    { name: 'BNP', balance: 3983.11 },
    { name: 'Binance', balance: 3000.11 },
  ];

  totalBalance: number;

  constructor(private router: Router) {
    this.totalBalance = this.accounts.reduce((sum, acc) => sum + acc.balance, 0);
  }

  logout() {
    // Implement logout logic here
    console.log('Logging out...');
  }

  isLinkActive(commands: any[] | string, exact: boolean = true): boolean {
    return this.router.isActive(
      typeof commands === 'string' ? commands : this.router.createUrlTree(commands),
      { 
        paths: exact ? 'exact' : 'subset', 
        queryParams: 'ignored', 
        fragment: 'ignored', 
        matrixParams: 'ignored' 
      }
    );
  }
}
