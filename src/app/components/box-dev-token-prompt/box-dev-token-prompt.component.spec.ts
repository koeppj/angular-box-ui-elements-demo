import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxDevTokenPromptComponent } from './box-dev-token-prompt.component';

describe('BoxDevTokenPromptComponent', () => {
  let component: BoxDevTokenPromptComponent;
  let fixture: ComponentFixture<BoxDevTokenPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BoxDevTokenPromptComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(BoxDevTokenPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
