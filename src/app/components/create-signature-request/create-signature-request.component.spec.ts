import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSignatureRequestComponent } from './create-signature-request.component';

describe('CreateSignatureRequestComponent', () => {
  let component: CreateSignatureRequestComponent;
  let fixture: ComponentFixture<CreateSignatureRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSignatureRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSignatureRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
