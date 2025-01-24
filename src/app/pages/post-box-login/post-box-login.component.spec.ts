import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBoxLoginComponent } from './post-box-login.component';

describe('PostBoxLoginComponent', () => {
  let component: PostBoxLoginComponent;
  let fixture: ComponentFixture<PostBoxLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostBoxLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostBoxLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
