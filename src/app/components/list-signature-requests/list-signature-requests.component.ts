import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { ToastService, ToastType } from '@app/services/toast.service';
import { SignRequest } from 'box-typescript-sdk-gen/lib/schemas/signRequest.generated';
import { NgbDropdownModule, NgbModal, NgbOffcanvas, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapInfoCircle } from '@ng-icons/bootstrap-icons';

export interface SignRequester {
  id: string;
  name: string | undefined
  email: string | undefined;
}

@Component({
  selector: 'app-list-signature-requests',
  imports: [CommonModule, NgbPaginationModule, NgIcon],
  templateUrl: './list-signature-requests.component.html',
  styleUrl: './list-signature-requests.component.scss',
  providers: [provideIcons({ bootstrapInfoCircle })]
})
export class ListSignatureRequestsComponent {


  private signRequesterMap: Map<string, SignRequester> = new Map();
  selectedRequest: SignRequest | undefined;

  setSignRequesters(signRequesters: SignRequester[]) {
    this.signRequesterMap.clear();
    signRequesters.forEach(requester => {
      this.signRequesterMap.set(requester.id, requester);
    });
  }

  getSignRequesterById(id: string): SignRequester | undefined {
    return this.signRequesterMap.get(id);
  }

  getRequesterNameForRequest(request: SignRequest): string | undefined {
    const id = (request as any).senderId;
    const requester = this.signRequesterMap.get(id);
    return requester ? requester.name : '';
  }

  addSignRequester(signRequester: SignRequester) {
    this.signRequesterMap.set(signRequester.id, signRequester);  
  }

  page = 1;
  collectionSize = 0;
  pageSize = 10;
  signatureRequests: SignRequest[] = [];
  isAuthenticated: boolean = false;

  constructor(private boxOAuthService: BoxOauthTokenService,
              private toastService: ToastService,
              private offCanvasService: NgbOffcanvas) {
    this.boxOAuthService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.isAuthenticated = true;
        this.getSignatureRequests();
      }
    })
            
  }

  async ngOnInit() {
    if (this.isAuthenticated)
      await this.getSignatureRequests();
  }

  async getSignatureRequests() {
    try {
      const response = await this.boxOAuthService.boxClient.signRequests.getSignRequests();
      if (response.entries) {
        this.signatureRequests = [...response.entries];
        this.collectionSize = this.signatureRequests.length;
      }
      this.signatureRequests.forEach(request => {
        const sender = (request as any).senderId;
        if (sender) {
          if (!this.signRequesterMap.has(sender)) {
            // Get the sender of the request and, if not in the signRequesterMap, add it
            this.boxOAuthService.boxClient.users.getUserById(sender).then(user => {
              this.addSignRequester({id: sender, name: user.name, email: user.login});
            })
          }
        }
      });
    } catch (error: any) {
      this.toastService.show({type: ToastType.Error, message: `Error ${error.statusCode}: ${error.message} `});
    }
  }

  showDetails(request: SignRequest, content: TemplateRef<any>) {
    this.selectedRequest = request;
    this.offCanvasService.open(content, {position: 'end'}).result.then(
      (result) => {
        console.debug(result);
      },
      (reason) => {
        console.debug(reason);
      })
  }

  get paginatedData(): SignRequest[] {
    if (this.signatureRequests) {
      return this.signatureRequests
        .slice((this.page - 1) * this.pageSize, (this?.page - 1) * this?.pageSize + this?.pageSize);
    }
    else {
      return [];
    }
  }

}
