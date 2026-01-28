import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailTransferPage } from './detail-transfer.page';

describe('DetailTransferPage', () => {
  let component: DetailTransferPage;
  let fixture: ComponentFixture<DetailTransferPage>;
  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
