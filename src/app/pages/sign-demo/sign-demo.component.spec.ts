import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignDemoComponent } from './sign-demo.component';

describe('SignDemoComponent', () => {
  let component: SignDemoComponent;
  let fixture: ComponentFixture<SignDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
