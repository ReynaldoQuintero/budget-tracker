import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNavbarComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'budget-tracker';
  showSidebar = true;

  // Add more routes here as needed
  hideSidebarRoutes = ['/sign-in'];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showSidebar = !this.shouldHideSidebar(this.router.url);
      });
  }

  shouldHideSidebar(url: string): boolean {
    return this.hideSidebarRoutes.some(route => url.startsWith(route));
  }
}
