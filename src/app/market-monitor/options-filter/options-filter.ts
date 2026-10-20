
import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

interface OptionContract {
  id: number;
  symbol: string;
  type: 'CE' | 'PE';
  strike: number;
  ltp: number;
  changePercent: number;
  iv: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  volume: number;
  oi: number;
}

@Component({
  selector: 'app-options-filter',
  imports: [DecimalPipe],
  templateUrl: './options-filter.html',
  styleUrl: './options-filter.css',
})
export class OptionsFilter {
  contracts: OptionContract[] = [
    {
      id: 1,
      symbol: 'NIFTY',
      type: 'CE',
      strike: 24500,
      ltp: 412.30,
      changePercent: 12.45,
      iv: 15.8,
      delta: 0.62,
      gamma: 0.0034,
      theta: -4.25,
      vega: 12.60,
      volume: 25650,
      oi: 124800,
    },
    {
      id: 2,
      symbol: 'NIFTY',
      type: 'CE',
      strike: 24550,
      ltp: 365.20,
      changePercent: 10.82,
      iv: 16.1,
      delta: 0.58,
      gamma: 0.0036,
      theta: -4.10,
      vega: 12.05,
      volume: 32410,
      oi: 156200,
    },
    {
      id: 3,
      symbol: 'NIFTY',
      type: 'PE',
      strike: 24500,
      ltp: 185.40,
      changePercent: -8.55,
      iv: 15.5,
      delta: -0.38,
      gamma: 0.0032,
      theta: -4.10,
      vega: 11.85,
      volume: 21420,
      oi: 110300,
    },
  ];
}
