import { NgModule } from '@angular/core';
import { BoxFolderInputComponent } from '@app/components/box-folder-input/box-folder-input.component';
import { ContentExplorerComponent } from '@app/components/content-explorer/content-explorer.component';
i
@NgModule({
  declarations: [
    ContentExplorerComponent
  ],
  imports: [BoxFolderInputComponent],
  providers: [],
  bootstrap: []
})
export class ContentExplorerDemoModule {

}
