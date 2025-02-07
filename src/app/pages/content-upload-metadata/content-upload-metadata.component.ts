import { Component } from '@angular/core';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { File } from 'box-typescript-sdk-gen/lib/schemas/file.generated';
import { BoxFolderInputComponent } from '../../components/box-folder-input/box-folder-input.component';
import { ContractFormComponent } from '../../components/contract-form/contract-form.component';

@Component({
    selector: 'app-content-upload-metadata',
    templateUrl: './content-upload-metadata.component.html',
    styleUrl: './content-upload-metadata.component.scss',
    imports: [BoxFolderInputComponent, ContractFormComponent]
})
export class ContentUploadMetadataComponent {

  public folderId = '0';
  options = {
    onComplete: this.onFileUpload
  }

  constructor(public boxOAuthService: BoxOauthTokenService) {}

  public onFolderIdChange(folderId: string) {
    this.folderId = folderId;
  }

  public onFileUpload(file: Array<File>) {
    console.log('File uploaded', file);
  }

}
