
import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

type OptionType = 'CE' | 'PE';
type Trend = 'BULLISH' | 'BEARISH' | 'NEUTRAL';
type Signal = 'BUY SETUP' | 'WATCH' | 'AVOID';
type SortOrder = 'score' | 'premium' | 'volume';

interface OptionContract {
  id: number;
  symbol: string;
  type: OptionType;
  strike: number;
  ltp: number;
  premiumChange: number;
  volumeSurge: number;
  oiChange: number;
  underlyingChange: number;
  delta: number;
  gamma: number;
  ivChange: number;
  trend: Trend;
  score: number;
  signal: Signal;
}

@Component({
  selector: 'app-options-filter',
  imports: [DecimalPipe],
  templateUrl: './options-filter.html',
  styleUrl: './options-filter.css',
})
export class OptionsFilter {
  sortOrder: SortOrder = 'score';

  contracts: OptionContract[] = [
    {
      id: 1,
      symbol: 'NIFTY',
      type: 'CE',
      strike: 24500,
      ltp: 412.30,
      premiumChange: 8.5,
      volumeSurge: 42,
      oiChange: 16,
      underlyingChange: 0.65,
      delta: 0.62,
      gamma: 0.0034,
      ivChange: -1.2,
      trend: 'BULLISH',
      score: 82,
      signal: 'WATCH',
    },
    {
      id: 2,
      symbol: 'NIFTY',
      type: 'CE',
      strike: 24550,
      ltp: 365.20,
      premiumChange: 6.8,
      volumeSurge: 28,
      oiChange: 12,
      underlyingChange: 0.65,
      delta: 0.58,
      gamma: 0.0036,
      ivChange: 0.5,
      trend: 'BULLISH',
      score: 74,
      signal: 'WATCH',
    },
    {
      id: 3,
      symbol: 'NIFTY',
      type: 'PE',
      strike: 24500,
      ltp: 185.40,
      premiumChange: -4.2,
      volumeSurge: 8,
      oiChange: -3,
      underlyingChange: 0.65,
      delta: -0.38,
      gamma: 0.0032,
      ivChange: 0.8,
      trend: 'NEUTRAL',
      score: 38,
      signal: 'AVOID',
    },
    {
      id: 4,
      symbol: 'NIFTY',
      type: 'PE',
      strike: 24450,
      ltp: 162.75,
      premiumChange: 5.4,
      volumeSurge: 35,
      oiChange: 18,
      underlyingChange: -0.48,
      delta: -0.42,
      gamma: 0.0038,
      ivChange: 1.6,
      trend: 'BEARISH',
      score: 85,
      signal: 'WATCH',
    },
  ];

  get ceCandidates(): number {
    return this.contracts.filter(
      contract => contract.type === 'CE' && contract.score >= 60
    ).length;
  }

  get peCandidates(): number {
    return this.contracts.filter(
      contract => contract.type === 'PE' && contract.score >= 60
    ).length;
  }

  get strongCandidates(): number {
    return this.contracts.filter(
      contract => contract.score >= 80
    ).length;
  }

  get sortedContracts(): OptionContract[] {
    return [...this.contracts].sort((a, b) => {
      switch (this.sortOrder) {
        case 'premium':
          return b.premiumChange - a.premiumChange;

        case 'volume':
          return b.volumeSurge - a.volumeSurge;

        case 'score':
        default:
          return b.score - a.score;
      }
    });
  }

  changeSort(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value;

    if (
      value === 'score' ||
      value === 'premium' ||
      value === 'volume'
    ) {
      this.sortOrder = value;
    }
  }
}
