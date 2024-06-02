import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersHistoryComponent } from './transfers-history.component';

describe('TransfersHistoryComponent', () => {
  let component: TransfersHistoryComponent;
  let fixture: ComponentFixture<TransfersHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransfersHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransfersHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
