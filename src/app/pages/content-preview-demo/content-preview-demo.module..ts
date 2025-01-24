import { NgModule } from '@angular/core';
import { BoxFileInputComponent } from '@app/components/box-file-input/box-file-input.component';
import { ContentPreviewComponent} from '@app/components/content-preview/content-preview.component';


@NgModule({
  declarations: [
    ContentPreviewComponent
  ],
  imports: [BoxFileInputComponent],
  providers: [],
  bootstrap: []
})
export class ContentPriviewDemoModule {

}
