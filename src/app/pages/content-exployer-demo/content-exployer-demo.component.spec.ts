import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentExployerDemoComponent } from './content-exployer-demo.component';

describe('ContentExployerDemoComponent', () => {
  let component: ContentExployerDemoComponent;
  let fixture: ComponentFixture<ContentExployerDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentExployerDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentExployerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
