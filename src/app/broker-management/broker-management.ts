
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/components/app-header/header';
import { ThemeService } from '../shared/theme-toggle/theme';
import { FormsModule } from '@angular/forms';

type BrokerId =
  | 'aliceblue'
  | 'zerodha'
  | 'upstox'
  | 'angelone'
  | 'fivepaisa';

type BrokerTab = 'connection' | 'features' | 'guide' | 'api';

interface Broker {
  id: BrokerId;
  name: string;
  shortName: string;
  logoText: string;
  description: string;
  recommended?: boolean;
  available: boolean;
}

@Component({
  selector: 'app-broker-management',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './broker-management.html',
  styleUrl: './broker-management.css'
})
export class BrokerManagement {
  private readonly themeService = inject(ThemeService);

  isDarkMode = false;

  selectedBrokerId: BrokerId = 'aliceblue';
  activeTab: BrokerTab = 'connection';

  showApiSecret = false;
  showApiKey = false;

  appId = '';
  apiSecret = '';
  apiKey = '';

  connectionStatus: 'disconnected' | 'testing' | 'connected' | 'error'
    = 'disconnected';

  statusMessage = 'Connect your account to start trading.';

  readonly brokers: Broker[] = [
    {
      id: 'aliceblue',
      name: 'Alice Blue',
      shortName: 'AL',
      logoText: 'A',
      description: 'Equity · F&O · Commodities',
      recommended: true,
      available: true
    },
    {
      id: 'zerodha',
      name: 'Zerodha',
      shortName: 'ZE',
      logoText: 'Z',
      description: 'Equity · F&O · Commodities',
      available: true
    },
    {
      id: 'upstox',
      name: 'Upstox',
      shortName: 'UP',
      logoText: 'up',
      description: 'Equity · F&O · Commodities',
      available: true
    },
    {
      id: 'angelone',
      name: 'Angel One',
      shortName: 'AO',
      logoText: 'A',
      description: 'Equity · F&O · Commodities',
      available: true
    },
    {
      id: 'fivepaisa',
      name: '5paisa',
      shortName: '5P',
      logoText: '5',
      description: 'Equity · F&O',
      available: true
    }
  ];

  readonly features = [
    'View live market data (Quotes, Depth)',
    'Place and manage orders',
    'View positions and holdings',
    'Get account and margin details',
    'Use for strategies and backtesting',
    'Real-time WebSocket data (after setup)'
  ];

  get selectedBroker(): Broker {
    return this.brokers.find(
      broker => broker.id === this.selectedBrokerId
    ) ?? this.brokers[0];
  }

  get isConnected(): boolean {
    return this.connectionStatus === 'connected';
  }

  get statusLabel(): string {
    switch (this.connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'testing':
        return 'Testing...';
      case 'error':
        return 'Connection Failed';
      default:
        return 'Not Connected';
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
  }

  selectBroker(broker: Broker): void {
    if (!broker.available) {
      return;
    }

    this.selectedBrokerId = broker.id;
    this.activeTab = 'connection';

    this.appId = '';
    this.apiSecret = '';
    this.apiKey = '';

    this.connectionStatus = 'disconnected';
    this.statusMessage = 'Connect your account to start trading.';
  }

  selectTab(tab: BrokerTab): void {
    this.activeTab = tab;
  }

  toggleSecretVisibility(): void {
    this.showApiSecret = !this.showApiSecret;
  }

  toggleKeyVisibility(): void {
    this.showApiKey = !this.showApiKey;
  }

  connectBroker(): void {
    if (!this.appId.trim() || !this.apiSecret.trim()) {
      this.connectionStatus = 'error';
      this.statusMessage = 'Please enter the required App ID and API Secret.';
      return;
    }

    // UI demo only. No broker API call is made here.
    this.connectionStatus = 'testing';
    this.statusMessage =
      'Demo mode: backend authentication is not configured yet.';
  }

  testConnection(): void {
    if (!this.appId.trim() || !this.apiSecret.trim()) {
      this.connectionStatus = 'error';
      this.statusMessage = 'Enter your App ID and API Secret first.';
      return;
    }

    // UI demo only. Replace with a backend API call later.
    this.connectionStatus = 'testing';
    this.statusMessage =
      'Demo test only. A real connection test will be added with the backend.';
  }

  disconnectBroker(): void {
    this.connectionStatus = 'disconnected';
    this.statusMessage = 'Broker disconnected in the UI demo.';
  }

  openSetupGuide(): void {
    this.activeTab = 'guide';
  }
}
