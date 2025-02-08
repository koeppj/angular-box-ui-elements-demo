import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { CreateMetadataTemplateRequestBodyFieldsField, GetMetadataTemplateScope } from 'box-typescript-sdk-gen/lib/managers/metadataTemplates.generated';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {

  public schemaPresent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public schemaMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('Contract templates does not exist - click to create')
  private templateName = 'contract'

  private authSubscription: Subscription | undefined = undefined;
  
  constructor(public boxOathTokenService: BoxOauthTokenService) {
    this.authSubscription = this.boxOathTokenService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
      // Use the Box SDK to check for the existence of a metadata schema called "contract"
      // Assuming you have a Box SDK client instance available as `boxClient`
      this.boxOathTokenService.boxClient.metadataTemplates.getMetadataTemplate(
        'enterprise' as GetMetadataTemplateScope, 
        this.templateName).then(doc => {
        this.schemaPresent$.next(true);
        this.schemaMessage$.next('Schema Template exists - your are good to go')
      }).catch(error => {
        console.error('Error fetching metadata templates:', error);
        this.schemaPresent$.next(false);
        this.schemaMessage$.next('Please click on the Create Scheme button to create the metadata template required for this demo')
      });
      }
    });
  }
  ngOnDestroy(): void {
    if (this.authSubscription) this.authSubscription.unsubscribe();
  }
  
  ngOnInit(): void {

  }

  public onDeleteScheme(): void {
    this.boxOathTokenService.boxClient.metadataTemplates.deleteMetadataTemplate(
      'enterprise' as GetMetadataTemplateScope, this.templateName
    ).then(resp => {
      this.schemaMessage$.next("Schema Deleted.  Some functions will not work as expected");
      this.schemaPresent$.next(false);
    }).catch(error => {
      this.schemaMessage$.next(`Problem deleting scheme: ${error.message}`);
    })
  }

  public onCreateScheme(): void {
    this.boxOathTokenService.boxClient.metadataTemplates.createMetadataTemplate({
      scope: 'enterprise',
      displayName: "Contract",
      templateKey: this.templateName,
      fields: [
        {
          type: 'string',
          key: "externalPartyName",
          displayName: "External Party Name",
          hidden: false
        },
        {
          type: "enum",
          key: "contractType",
          displayName: "Contract Type",
          hidden: false,
          options: [
            { key: "Amendment" },
            { key: "Sales Agreement" },
            { key: "Non Disclosure Agreement" },
            { key: "Master Agreement" }
          ]
        },
        {
          type: "date",
          key: "endDate",
          displayName: "End Date",
          hidden: false
        },
        {
          type: "enum",
          key: "autoRenew",
          displayName: "Auto Renew",
          hidden: false,
          options: [
            { key: "No" },
            { key: "Yes" }
          ]
        },
        {
          type: "enum",
          key: "lawyer",
          displayName: "Lawyer",
          hidden: false,
          options: [
            { key: "Karl Jones" },
            { key: "Tony Clark" },
            { key: "Darren Daniels" },
            { key: "Erica Adams" }
          ]
        },
        {
          type: "enum",
          key: "riskLevel",
          displayName: "Risk Level",
          hidden: false,
          options: [
            { key: "Normal" },
            { key: "Extreme" }
          ]
        }
      ]
      }).then(result => {
        this.schemaMessage$.next("Schema Created!!! - Please proceed");    
        this.schemaPresent$.next(true);    
      }).catch(error => {
        this.schemaMessage$.next(`Error creatingin schema: ${error.message}`);
      });
  }

}
