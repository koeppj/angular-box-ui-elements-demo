import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { CreateFileMetadataByIdScope } from 'box-typescript-sdk-gen/lib/managers/fileMetadata.generated';
import { Files } from 'box-typescript-sdk-gen/lib/schemas/files.generated';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrl: './contract-form.component.scss',
  imports: [ReactiveFormsModule,CommonModule]
})
export class ContractFormComponent implements OnInit {
  @Input() folderId: string | undefined = '0';

  contractForm!: FormGroup;
  submitted = false;
  message = '';

  contractTypes:string[] = [];
  riskLevels:string[] = [];
  lawyers:string[] = [];
  selectedfile: File | null = null;

  constructor(private boxOAuthTokenService: BoxOauthTokenService,
              private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    // Populate the dropdown based on the metadata template values.
    this.boxOAuthTokenService.boxClient.metadataTemplates.getMetadataTemplate('enterprise', 'contract')
      .then((contractTemplate) => {
        let fields = contractTemplate.fields;
        if (fields) {
          let idx = fields.findIndex((field) => field.key === 'lawyer');
          if (idx !== -1) {
            this.lawyers = fields[idx].options?.map((option) => option.key) || [];
          }
          else {this.message = 'No lawyer field found in metadata template'};
          idx = fields.findIndex((field) => field.key === 'contractType');
          if (idx !== -1) {
            this.contractTypes = fields[idx].options?.map((option) => option.key) || [];
          }
          else {this.message = 'No contractType field found in metadata template'};
          idx = fields.findIndex((field) => field.key === 'riskLevel');
          if (idx !== -1) {
            this.riskLevels = fields[idx].options?.map((option) => option.key) || [];
          }
          else {this.message = 'No riskLevel field found in metadata template'};
        }
        else {
          this.message = 'No metadata template fields found';
        }
        
      })
      .catch((error) => {
        this.message = `Error fetching metadata template: ${error}`;
        console.error('Error fetching metadata template:', error);
      });
    this.contractForm = new FormGroup({
      externalPartyName: new FormControl('', Validators.required),
      contractType: new FormControl('', Validators.required),
      riskLevel: new FormControl('', Validators.required),
      lawyer: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      autoRenew: new FormControl('', Validators.required),
      attachment: new FormControl(null,Validators.required),
    });
  }

  // For easy access to form fields in the template
  get f() {
    return this.contractForm.controls;
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    // Stop if the form is invalid
    if (this.contractForm.invalid) {
      return;
    }

    if (!this.selectedfile) {
      return;
    }

    let formData = new FormData();

    // Construct the form request
    console.debug(`attachment: ${this.contractForm.value.attachment}`);
    const attrs = {
      name: this.selectedfile.name,
      parent: { id: this.folderId },
    };
    formData.append('attributes', JSON.stringify(attrs));
    formData.append('file', this.selectedfile);

    // Metadata for the file
    const contractEndDate = new Date(this.contractForm.value.endDate);
    const metadata = {
      externalPartyName: this.contractForm.value.externalPartyName,
      contractType: this.contractForm.value.contractType,
      riskLevel: this.contractForm.value.riskLevel,
      lawyer: this.contractForm.value.lawyer,
      endDate: contractEndDate.toISOString(),
      autoRenew: this.contractForm.value.autoRenew,
    };

    // Upload the file to Box and attach metadata
    try {
      const boxToken = await this.boxOAuthTokenService.getBearerToken()
      const uploadResp = lastValueFrom(this.httpClient.post('https://upload.box.com/api/2.0/files/content', formData, {
        headers: {
          Authorization: `${boxToken}`,
        },
        observe: 'response'
      })).catch(error => {
        throw error;
      });

      const newFileData: Files = (await uploadResp).body?.valueOf() || {};
      const fileId  = newFileData.entries?.[0].id;
      if (!fileId) {
        throw new Error('File ID not found');
      }
      this.boxOAuthTokenService.boxClient.fileMetadata.createFileMetadataById(
        fileId,
        'enterprise' as CreateFileMetadataByIdScope,
        'contract',
        metadata).catch(error => {
          throw error
        });
      this.message = 'File uploaded successfully';
      this.contractForm.reset();
    }
    catch (error: any) {
      this.message = `Error uploading file: ${error.message}`;
      console.error('Uploading File:', error);
    }
    

    // Handle valid form data here
    console.log('Contract Form submitted successfully:', this.contractForm.value);
  }

  onFilesSelected(event:Event){
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedfile = input.files[0];
    }
  }
}
