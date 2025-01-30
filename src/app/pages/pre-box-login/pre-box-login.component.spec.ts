import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBoxLoginComponent } from './pre-box-login.component';

describe('PreBoxLoginComponent', () => {
  let component: PreBoxLoginComponent;
  let fixture: ComponentFixture<PreBoxLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PreBoxLoginComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(PreBoxLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
