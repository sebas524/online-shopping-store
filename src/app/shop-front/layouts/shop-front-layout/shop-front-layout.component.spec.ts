import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFrontLayoutComponent } from './shop-front-layout.component';

describe('ShopFrontLayoutComponent', () => {
  let component: ShopFrontLayoutComponent;
  let fixture: ComponentFixture<ShopFrontLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopFrontLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopFrontLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
