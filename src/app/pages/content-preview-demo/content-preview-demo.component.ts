import { Component } from '@angular/core';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { environment } from '../../../environment/environment';
import { BoxFileInputComponent } from '../../components/box-file-input/box-file-input.component';
import { ContentPreviewComponent } from '../../components/content-preview/content-preview.component';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
    selector: 'content-exployer-demo',
    templateUrl: './content-preview-demo.component.html',
    styleUrl: './content-preview-demo.component.scss',
    imports: [BoxFileInputComponent, ContentPreviewComponent, AsyncPipe, CommonModule]
})

export class ContentPreviewDemoComponent {

  fileId = environment.BoxPreviewFileID
  showPreview = true;
  options = {};

  constructor(public boxOAuthService: BoxOauthTokenService

  ) { 
  }

  onFileIdChange(folderId: string) {
    this.fileId = folderId;
  }

  onSelectingFile(selectingFile: boolean) {
    console.debug(`onSelectingFile(${selectingFile})`);
    this.showPreview = !selectingFile;
  }

}
