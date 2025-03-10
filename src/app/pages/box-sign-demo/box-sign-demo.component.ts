import { Component } from '@angular/core';
import { CreateSignatureRequestComponent } from '@app/components/create-signature-request/create-signature-request.component';
import { ListSignatureRequestsComponent } from '@app/components/list-signature-requests/list-signature-requests.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { bootstrapPlus } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-box-sign-demo',
  imports: [ListSignatureRequestsComponent, NgIcon],
  templateUrl: './box-sign-demo.component.html',
  styleUrl: './box-sign-demo.component.scss',
  providers: [provideIcons({bootstrapPlus})]
})
export class BoxSignDemoComponent {

  constructor(private modalService: NgbModal) {}

  createSignatureRequest() {
    this.modalService.open(CreateSignatureRequestComponent, {fullscreen: true});
  }
}
