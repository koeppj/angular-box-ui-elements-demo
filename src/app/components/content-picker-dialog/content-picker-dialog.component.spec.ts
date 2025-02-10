import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPickerDialogComponent } from './content-picker-dialog.component';

describe('ContentPickerDialogComponent', () => {
  let component: ContentPickerDialogComponent;
  let fixture: ComponentFixture<ContentPickerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentPickerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentPickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
