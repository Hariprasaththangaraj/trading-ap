import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketMonitor } from './market-monitor';

describe('MarketMonitor', () => {
  let component: MarketMonitor;
  let fixture: ComponentFixture<MarketMonitor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketMonitor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketMonitor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
