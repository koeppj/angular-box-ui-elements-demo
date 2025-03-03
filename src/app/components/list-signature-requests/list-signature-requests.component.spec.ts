import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSignatureRequestsComponent } from './list-signature-requests.component';

describe('ListSignatureRequestsComponent', () => {
  let component: ListSignatureRequestsComponent;
  let fixture: ComponentFixture<ListSignatureRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSignatureRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSignatureRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
