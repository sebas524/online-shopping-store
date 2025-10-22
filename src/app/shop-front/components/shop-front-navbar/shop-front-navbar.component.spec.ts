import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFrontNavbarComponent } from './shop-front-navbar.component';

describe('ShopFrontNavbarComponent', () => {
  let component: ShopFrontNavbarComponent;
  let fixture: ComponentFixture<ShopFrontNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopFrontNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopFrontNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
