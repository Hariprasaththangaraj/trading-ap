
import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class AppLayout {

  // Sidebar state
  isCollapsed = false;

  marketMonitorExpanded = false;

  // Toggle sidebar open / close
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMarketMonitor(): void {
    this.marketMonitorExpanded = !this.marketMonitorExpanded;
  }

  // Close sidebar after selecting a menu on mobile
  closeSidebarOnMobile(): void {
    if (window.innerWidth <= 768) {
      this.isCollapsed = true;
    }
  }
}
