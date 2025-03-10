import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxSignDemoComponent } from './box-sign-demo.component';

describe('BoxSignDemoComponent', () => {
  let component: BoxSignDemoComponent;
  let fixture: ComponentFixture<BoxSignDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxSignDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxSignDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
