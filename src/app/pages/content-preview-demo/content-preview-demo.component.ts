import { Component } from '@angular/core';
import { BoxComponentsType } from '@app/enums/box-component-enum';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'content-exployer-demo',
  templateUrl: './content-preview-demo.component.html',
  styleUrl: './content-preview-demo.component.scss',
  standalone: false
})

export class ContentPreviewDemoComponent {

  fileId = environment.BoxPreviewFileID
  options = {};

  constructor(public boxOAuthService: BoxOauthTokenService

  ) { 
  }

  onFileIdChange(folderId: string) {
    this.fileId = folderId;
  }

}
