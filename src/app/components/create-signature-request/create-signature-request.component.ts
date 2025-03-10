import { Component } from '@angular/core';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { ToastService } from '@app/services/toast.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-signature-request',
  imports: [],
  templateUrl: './create-signature-request.component.html',
  styleUrl: './create-signature-request.component.scss'
})
export class CreateSignatureRequestComponent {

  constructor(private boxOAuthService: BoxOauthTokenService,
              private toastService: ToastService,
              private activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
