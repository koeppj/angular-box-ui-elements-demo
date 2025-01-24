import { Component } from '@angular/core';
import { BoxComponentsType } from '@app/enums/box-component-enum';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';

@Component({
  selector: 'content-upload-demo',
  templateUrl: './content-upload-demo.component.html',
  styleUrl: './content-upload-demo.component.scss',
  standalone: false
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
