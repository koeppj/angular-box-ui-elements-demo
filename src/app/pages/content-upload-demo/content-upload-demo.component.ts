import { Component } from '@angular/core';
import { BoxComponentsType } from '@app/enums/box-component-enum';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { BoxFolderInputComponent } from '../../components/box-folder-input/box-folder-input.component';
import { ContentUploadComponent } from '../../components/content-upload/content-upload.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'content-upload-demo',
    templateUrl: './content-upload-demo.component.html',
    styleUrl: './content-upload-demo.component.scss',
    imports: [BoxFolderInputComponent, ContentUploadComponent, AsyncPipe]
})

export class ContentUploadDemoComponent {

  folderId = '0';
  options = {};

  constructor(public boxOAuthService: BoxOauthTokenService

  ) { 
  }

  onFolderIdChange(folderId: string) {
    this.folderId = folderId;
  }

}
