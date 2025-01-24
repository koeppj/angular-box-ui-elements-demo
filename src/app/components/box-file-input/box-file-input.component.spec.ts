import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxFileInputComponent } from './box-file-input.component';

describe('BoxFileInputComponent', () => {
  let component: BoxFileInputComponent;
  let fixture: ComponentFixture<BoxFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxFileInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
