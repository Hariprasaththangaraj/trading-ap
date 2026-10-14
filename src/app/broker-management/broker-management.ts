
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/components/app-header/header';
import { ThemeService } from '../shared/theme-toggle/theme';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  private readonly http = inject(HttpClient);

  isDarkMode = false;

  selectedBrokerId: BrokerId = 'aliceblue';
  activeTab: BrokerTab = 'connection';

  showApiSecret = false;
  showApiKey = false;

  appId = '';          // Optional API ID
  appKey = '';         // App Key
  apiSecret = '';      // API Secret
  userId = 'AB047757'; // Client ID
  brokerName = 'Aliceblue';

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
    this.appKey = '';
    this.userId = '';

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
    if (
      !this.userId.trim() ||
      !this.appKey.trim() ||
      !this.apiSecret.trim()
    ) {
      this.connectionStatus = 'error';
      this.statusMessage =
        'Please enter the Client ID, App Key and API Secret.';
      return;
    }

    const payload = {
      brokerName: this.brokerName,
      appKey: this.appKey.trim(),
      appSecret: this.apiSecret,
      appId: this.appId.trim(),
      userId: this.userId.trim()
    };

    this.connectionStatus = 'testing';
    this.statusMessage = 'Connecting to backend...';
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      this.connectionStatus = 'error';
      this.statusMessage = 'Please log in before connecting your broker.';
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    this.http
      .post(
        'http://localhost:8080/api/brokerConfig/connection',
        payload,
        { headers }
      )
      .subscribe({
        next: (response) => {
          this.connectionStatus = 'connected';
          this.statusMessage =
            'Backend response received successfully.';

          console.log('Broker connection request succeeded.');
        },

        error: (error) => {
          this.connectionStatus = 'error';

          if (error.status === 0) {
            this.statusMessage =
              'Cannot reach backend. Check Spring Boot and CORS settings.';
          } else {
            this.statusMessage =
              `Backend request failed. HTTP status: ${error.status}`;
          }

          console.error('Broker connection request failed.');
        }
      });
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
