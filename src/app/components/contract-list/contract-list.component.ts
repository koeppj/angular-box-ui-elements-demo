import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { MetadataQuery, MetadataQueryOrderByField } from 'box-typescript-sdk-gen/lib/schemas/metadataQuery.generated';
import { EventEmitter, Output } from '@angular/core';
import { FileFullMetadataField } from 'box-typescript-sdk-gen/lib/schemas/fileFull.generated';
import { MetadataFull } from 'box-typescript-sdk-gen/lib/schemas/metadataFull.generated'
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { environment } from '@environment/environment';
import { MetadataTemplate } from 'box-typescript-sdk-gen/lib/schemas/metadataTemplate.generated';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { bootstrapLock, bootstrapLockFill } from '@ng-icons/bootstrap-icons';
import { DeleteFileByIdHeadersInput, DeleteFileByIdOptionalsInput, UpdateFileByIdOptionalsInput } from 'box-typescript-sdk-gen/lib/managers/files.generated';
import { ToastService, ToastType } from '@app/services/toast.service';

interface ContractData {
  id: string;
  name?: string;
  externalPartyName?: string;
  contractType?: string;
  endDate?: Date;
  autoRenew?: boolean;
  lawyer?: string;
  riskLevel?: string;
  lock?: any;
  etag: string | null | undefined;
};

@Component({
  selector: 'app-contract-list',
  imports: [CommonModule, NgbPaginationModule, NgbDropdownModule, NgIcon],
  templateUrl: './contract-list.component.html',
  styleUrl: './contract-list.component.scss',
  providers: [provideIcons({ bootstrapLock, bootstrapLockFill })]
})
export class ContractListComponent implements OnInit, OnDestroy {
  @Input() folderId: string | undefined = '0';
  @Input() orderBy: MetadataQueryOrderByField[] | undefined = [];
  @Input() pageSize: number = 10;
  @Input() query: string | undefined = undefined;
  @Input() queryParams: { [key: string]: any } = [];

  page = 1;
  collectionSize = 0;

  contracts: ContractData[] | undefined = [];
  contractTemplate: MetadataTemplate | undefined = undefined;
  authSubscription: Subscription | undefined = undefined;
  isAuthenticated: boolean = false;
  errorMessage: string = '';

  scope = `enterprise_${environment.BoxEnterpriseId}`;

  constructor(public boxOAuthTokenService: BoxOauthTokenService, private toastService: ToastService) {
    this.boxOAuthTokenService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated)
        this.setUp();
    })
  }

  setUp() {
    this.isAuthenticated = true;
  }

  ngOnDestroy(): void {
    if (this.authSubscription) this.authSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  onUnlock(id: string) {
    const i = this.getItem(id);
    // Make sure to check of changed since retrieal
    const unlockOpts: UpdateFileByIdOptionalsInput = {
      headers: {
        ifMatch: this.contracts ? (this.contracts[i].etag ?? undefined) : undefined
      },
      requestBody: {
        lock: null
      }
    }
    this.boxOAuthTokenService.boxClient.files.updateFileById(id,unlockOpts).then(item => {
      const newContract = this.contracts ? this.contracts[i] : undefined;
      if (newContract) {
        newContract.lock = undefined;
        if (this.contracts) {
          this.contracts[i] = newContract;
        }
      }
      this.toastService.show({type: ToastType.Message, message: "File Unlocked"});
    }).catch(error => {
      this.toastService.show({type: ToastType.Error, message: `Error ${error.statusCode}: ${error.message} `});
    })
  }

  onLock(id: string) {
    const i = this.getItem(id);
    // Make sure to check if changed since last retrival and 
    // to include the lock object in the response object
    const unlockOpts: UpdateFileByIdOptionalsInput = {
      queryParams: {
        fields: ["lock"]
      },
      headers: {
        ifMatch: this.contracts ? (this.contracts[i].etag ?? undefined) : undefined
      },
      requestBody: {
        lock: {
          access: "lock"
        }
      }
    }
    this.boxOAuthTokenService.boxClient.files.updateFileById(id,unlockOpts).then(item => {
      const newContract = this.contracts ? this.contracts[i] : undefined;
      if (newContract) {
        newContract.lock = item.lock;
        if (this.contracts) {
          this.contracts[i] = newContract;
        }
      }
      this.toastService.show({type: ToastType.Message, message: "File Locked"});
    }).catch(error => {
      this.toastService.show({type: ToastType.Error, message: `Error ${error.statusCode}: ${error.message} `});
    })
  }

  onPreview(id :string) {
    window.open(`https://app.box.com/file/${id}`, '_blank');
  }

  onDelete(id: string) {
    const i = this.getItem(id);
    const deleteOpts: DeleteFileByIdOptionalsInput = {
      headers: {
        ifMatch: this.contracts ? (this.contracts[i].etag ?? undefined) : undefined
      }
    }
    this.boxOAuthTokenService.boxClient.files.deleteFileById(id,deleteOpts).then(item => {
      this.contracts?.splice(i,1);
      this.toastService.show({type: ToastType.Warning, message: "File Deleted"});
    }).catch(error => {
      this.toastService.show({type: ToastType.Error, message: `Error ${error.statusCode}: ${error.message} `});
    })
  }

  onDownload(id: string) {
    this.boxOAuthTokenService.boxClient.downloads.getDownloadFileUrl(id).then(url => {
      const a = document.createElement('a');
      a.href = url;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }).catch(error => {
      this.toastService.show({type: ToastType.Error, message: `Error ${error.statusCode}: ${error.message} `});
    })

  }

  async fetchData() {
    try {
      const query: MetadataQuery = {
        ancestorFolderId: this.folderId ?? '0',
        from: `${this.scope}.contract`,
        fields: [
          'lock',
          `metadata.${this.scope}.contract.externalPartyName`,
          `metadata.${this.scope}.contract.contractType`,
          `metadata.${this.scope}.constract.endDate`,
          `metadata.${this.scope}.contract.autoRenew`,
          `metadata.${this.scope}.contract.lawyer`,
          `metadata.${this.scope}.contract.riskLevel`,
        ]
      }
      const results = await this.boxOAuthTokenService.boxClient.search.searchByMetadataQuery(query);
      if (results) {
        this.contracts = results.entries?.map(entry => {
          const metadata = entry.metadata as FileFullMetadataField
          const extraData = metadata.extraData as {
            readonly [key: string]: {
              readonly [key: string]: MetadataFull;
            }
          };
          const contractData = extraData[this.scope]['contract'];
          return  {
            id: entry.id,
            name: entry.name,
            externalPartyName: contractData.extraData?.['externalPartyName']?.replace(/_/g, ' '),
            contractType: contractData.extraData?.['contractType']?.replace(/_/g, ' '),
            endDate: contractData.extraData?.['endDate'],
            autoRenew: contractData.extraData?.['authRenew'],
            lawyer: contractData.extraData?.['lawyer']?.replace(/_/g, ' '),
            riskLevel: contractData.extraData?.['riskLevel']?.replace(/_/g, ' '),
            lock: (entry as any).lock,
            etag: entry.etag
          }
        })
        if (this.contracts)
          this.collectionSize = this.contracts?.length;
      }

    } catch (error: any) {
      this.toastService.show({type: ToastType.Error, message: `Error Encountered: ${error.message} `});
    }
  }

  get paginatedData(): ContractData[] {
    if (this.contracts) {
      return this.contracts
        .slice((this.page - 1) * this.pageSize, (this?.page - 1) * this?.pageSize + this?.pageSize);
    }
    else {
      return [];
    }
  }

  toggleAction(dropdown: any) {
    dropdown.isOpen() ? dropdown.close() : dropdown.open();
  }
 
  getItem(id: string): number {
    return this.contracts?.findIndex(contract => contract.id === id) ?? -1;
  }
}
