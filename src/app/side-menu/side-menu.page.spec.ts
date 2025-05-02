import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SideMenuPage } from './side-menu.page';

describe('SideMenuPage', () => {
  let component: SideMenuPage;
  let fixture: ComponentFixture<SideMenuPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuPage],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SideMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
