import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { MetadataQuery, MetadataQueryOrderByField } from 'box-typescript-sdk-gen/lib/schemas/metadataQuery.generated';
import { EventEmitter, Output } from '@angular/core';
import { FileFullMetadataField } from 'box-typescript-sdk-gen/lib/schemas/fileFull.generated';
import { MetadataFull } from 'box-typescript-sdk-gen/lib/schemas/metadataFull.generated'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { GetMetadataTemplateScope } from 'box-typescript-sdk-gen/lib/managers/metadataTemplates.generated';
import { environment } from '@environment/environment';
import { MetadataTemplate } from 'box-typescript-sdk-gen/lib/schemas/metadataTemplate.generated';


interface ContractData {
  id: string;
  name?: string;
  externalPartyName?: string;
  contractType?: string;
  endDate?: Date;
  autoRenew?: boolean;
  lawyer?: string;
  riskLevel?: string;
};

@Component({
  selector: 'app-contract-list',
  imports: [CommonModule, NgbPaginationModule],
  templateUrl: './contract-list.component.html',
  styleUrl: './contract-list.component.scss'
})
export class ContractListComponent implements OnInit, OnDestroy {
  @Input() folderId: string | undefined = '0';
  @Input() orderBy: MetadataQueryOrderByField[] | undefined = [];
  @Input() pageSize: number = 10;
  @Input() query: string | undefined = undefined;
  @Input() queryParams: { [key: string]: any } = [];

  @Output('errorMessage') errorOccurred: EventEmitter<string> = new EventEmitter<string>();

  page = 1;
  collectionSize = 0;

  contracts: ContractData[] | undefined = [];
  contractTemplate: MetadataTemplate | undefined = undefined;
  authSubscription: Subscription | undefined = undefined;
  isAuthenticated: boolean = false;
  errorMessage: string = '';

  scope = `enterprise_${environment.BoxEnterpriseId}`;

  constructor(public boxOAuthTokenService: BoxOauthTokenService) {
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

  async fetchData() {
    try {
      const query: MetadataQuery = {
        ancestorFolderId: this.folderId ?? '0',
        from: `${this.scope}.contract`,
        fields: [
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
        console.log(results);
        this.contracts = results.entries?.map(entry => {
          const metadata = entry.metadata as FileFullMetadataField
          const extraData = metadata.extraData as {
            readonly [key: string]: {
              readonly [key: string]: MetadataFull;
            }
          };
          const contractData = extraData[this.scope]['contract'];
          return {
            id: entry.id,
            name: entry.name,
            externalPartyName: contractData.extraData?.['externalPartyName']?.replace(/_/g, ' '),
            contractType: contractData.extraData?.['contractType']?.replace(/_/g, ' '),
            endDate: contractData.extraData?.['endDate'],
            autoRenew: contractData.extraData?.['authRenew'],
            lawyer: contractData.extraData?.['lawyer']?.replace(/_/g, ' '),
            riskLevel: contractData.extraData?.['riskLevel']?.replace(/_/g, ' '),
          }
        })
        if (this.contracts)
          this.collectionSize = this.contracts?.length;
      }

    } catch (error) {
      console.error(error);
      this.errorOccurred.emit((error as Error).message);
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

}
