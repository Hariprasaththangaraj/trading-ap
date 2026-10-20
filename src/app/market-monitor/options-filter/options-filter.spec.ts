import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsFilter } from './options-filter';

describe('OptionsFilter', () => {
  let component: OptionsFilter;
  let fixture: ComponentFixture<OptionsFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
