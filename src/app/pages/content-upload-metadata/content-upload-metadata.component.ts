import { Component } from '@angular/core';
import { BoxComponentsType } from '@app/enums/box-component-enum';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { File } from 'box-typescript-sdk-gen/lib/schemas/file.generated';

@Component({
  selector: 'app-content-upload-metadata',
  templateUrl: './content-upload-metadata.component.html',
  styleUrl: './content-upload-metadata.component.scss',
  standalone: false
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
