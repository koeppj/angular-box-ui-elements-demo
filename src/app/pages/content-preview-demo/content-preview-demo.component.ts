import { Component } from '@angular/core';
import { BoxComponentsType } from '@app/enums/box-component-enum';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { environment } from '../../../environment/environment';
import { BoxFileInputComponent } from '../../components/box-file-input/box-file-input.component';
import { ContentPreviewComponent } from '../../components/content-preview/content-preview.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'content-exployer-demo',
    templateUrl: './content-preview-demo.component.html',
    styleUrl: './content-preview-demo.component.scss',
    imports: [BoxFileInputComponent, ContentPreviewComponent, AsyncPipe]
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
