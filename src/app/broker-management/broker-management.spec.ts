import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerManagement } from './broker-management';

describe('BrokerManagement', () => {
  let component: BrokerManagement;
  let fixture: ComponentFixture<BrokerManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrokerManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokerManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
