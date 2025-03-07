import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { ToastService, ToastType } from '@app/services/toast.service';
import { SignRequest } from 'box-typescript-sdk-gen/lib/schemas/signRequest.generated';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

export interface SignRequester {
  id: string;
  name: string;
  emal: string;
}

@Component({
  selector: 'app-list-signature-requests',
  imports: [CommonModule, NgbPaginationModule, NgbDropdownModule],
  templateUrl: './list-signature-requests.component.html',
  styleUrl: './list-signature-requests.component.scss'
})
export class ListSignatureRequestsComponent {


  private signRequesterMap: Map<string, SignRequester> = new Map();

  setSignRequesters(signRequesters: SignRequester[]) {
    this.signRequesterMap.clear();
    signRequesters.forEach(requester => {
      this.signRequesterMap.set(requester.id, requester);
    });
  }

  getSignRequesterById(id: string): SignRequester | undefined {
    return this.signRequesterMap.get(id);
  }

  getRequesterNameForRequest(request: SignRequest): string {
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
              private toastService: ToastService) {
    this.boxOAuthService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated)
        this.isAuthenticated = true;
    })
            
  }

  async ngOnInit() {
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
        // Get the sender of the request and, if no in the signRequesterMap, add it
        console.log(`Processing request with ID: ${request.id}`);
      });
    } catch (error: any) {
      this.toastService.show({type: ToastType.Error, message: `Error ${error.statusCode}: ${error.message} `});
    }
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
