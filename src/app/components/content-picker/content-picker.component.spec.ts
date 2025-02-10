import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPickerComponent } from './content-picker.component';

describe('ContentPickerComponent', () => {
  let component: ContentPickerComponent;
  let fixture: ComponentFixture<ContentPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
