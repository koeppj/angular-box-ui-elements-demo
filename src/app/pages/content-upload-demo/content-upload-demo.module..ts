import { NgModule } from '@angular/core';
import { BoxFolderInputComponent } from '@app/components/box-folder-input/box-folder-input.component';
import { ContentUploadComponent } from '@app/components/content-upload/content-upload.component';

@NgModule({
  declarations: [
    ContentUploadComponent
  ],
  imports: [BoxFolderInputComponent],
  providers: [],
  bootstrap: []
})
export class ContentUploadDemmoMetadModule {

}
