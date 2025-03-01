import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { File } from 'box-typescript-sdk-gen/lib/schemas/file.generated'
import { lastValueFrom } from 'rxjs';
import { BoxFolderInputComponent } from '../../components/box-folder-input/box-folder-input.component';
import { ContentExplorerComponent } from '../../components/content-explorer/content-explorer.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { has } from 'lodash';

@Component({
    selector: 'content-exployer-demo',
    templateUrl: './content-exployer-demo.component.html',
    styleUrl: './content-exployer-demo.component.scss',
    imports: [CommonModule, BoxFolderInputComponent, ContentExplorerComponent, AsyncPipe],
    standalone: true
})

export class ContentExployerDemoComponent {

  folderId = '0';
  options = {
    contentPreviewProps: {
      contentSidebarProps: {
        detailsSidebarProps: {
          hasProperties: true,
          hasAccessStats: true,
          hasVersions: true,
          hasClassification: true,
          hasNotices: true,
          hasSkills: true,
        },
        hasMetadata: true,
        hasActivityFeed: true,
        hasVersions: true,
      },
    },
    canShare: true,
  }

  constructor(public boxOAuthService: BoxOauthTokenService,
              private httpClient: HttpClient
  ) { 
  }

  onFolderIdChange(folderId: string) {
    this.folderId = folderId;
  }

  async onFilePreview(event: File[])   {
    const file = event[0];
    console.log('File previewed', file);
    try{
      const fileId = file.id;
      console.debug(`Gettiing download URL for file:${fileId}`);
      const downloadUrl = await this.boxOAuthService.boxClient.downloads.getDownloadFileUrl(fileId);
      const localPayload = {
        downloadUrl: downloadUrl,
        fileName: file.name
      }
      const localRequest = lastValueFrom(this.httpClient.post("http://localhost:3000",localPayload));
    }
    catch (error: any) {
      console.log(`Error getting download URL:${error.message}`)
    }
  }
}
