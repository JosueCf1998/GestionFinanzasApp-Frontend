import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryTransferPage } from './history-transfer.page';

describe('GraphicsPage', () => {
  let component: HistoryTransferPage;
  let fixture: ComponentFixture<HistoryTransferPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
