import { NgModule } from '@angular/core';
import { BoxFolderInputComponent } from '@app/components/box-folder-input/box-folder-input.component';
import { ContentUploadComponent } from '@app/components/content-upload/content-upload.component'
import { ContractFormComponent } from '@app/components/contract-form/contract-form.component';

@NgModule({
  declarations: [
    ContentUploadComponent,
  ],
  imports: [BoxFolderInputComponent, ContractFormComponent],
  providers: [],
  bootstrap: []
})
export class ContentUploadMetadModule {
  
  folderId: string | undefined = '0';

  onFolderIdChange(folderId: string): void {
    this.folderId = folderId;
  }
}
