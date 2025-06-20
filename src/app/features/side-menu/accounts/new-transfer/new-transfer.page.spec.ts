import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTransferPage } from './new-transfer.page';

describe('GraphicsPage', () => {
  let component: NewTransferPage;
  let fixture: ComponentFixture<NewTransferPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
