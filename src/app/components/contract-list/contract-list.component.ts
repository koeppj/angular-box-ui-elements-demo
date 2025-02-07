import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { MetadataQuery, MetadataQueryOrderByField } from 'box-typescript-sdk-gen/lib/schemas/metadataQuery.generated';
import { EventEmitter, Output } from '@angular/core';
import { environment } from '@environment/environment';
import { FileFullMetadataField } from 'box-typescript-sdk-gen/lib/schemas/fileFull.generated';
import { MetadataFull } from 'box-typescript-sdk-gen/lib/schemas/metadataFull.generated'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


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
export class ContractListComponent implements OnInit {
  @Input() folderId: string | undefined  = '0';
  @Input() orderBy: MetadataQueryOrderByField[] | undefined = [];
  @Input() pageSize: number = 10;
  @Input() query: string | undefined = undefined;
  @Input() queryParams: {[key: string]: any} = [];

  @Output() errorOccurred: EventEmitter<string> = new EventEmitter<string>();

  page = 1;
  collectionSize = 0;

  contracts: ContractData[] | undefined= [];

  scope = `enterprise_${environment.BoxEnterpriseId}`;

  constructor(public boxOAuthTokenService: BoxOauthTokenService) { }

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
            externalPartyName: contractData.extraData?.['externalPartyName'],
            contractType: contractData.extraData?.['contractType'],
            endDate: contractData.extraData?.['endDate'],
            autoRenew: contractData.extraData?.['authRenew'],
            lawyer: contractData.extraData?.['lawyer'],
            riskLevel: contractData.extraData?.['riskLevel'],
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
