import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxOauthStatusComponent } from './box-oauth-status.component';

describe('BoxOauthStatusComponent', () => {
  let component: BoxOauthStatusComponent;
  let fixture: ComponentFixture<BoxOauthStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BoxOauthStatusComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(BoxOauthStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
