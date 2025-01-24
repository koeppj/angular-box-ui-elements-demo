import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-box-file-input',
  imports: [ReactiveFormsModule],
  templateUrl: './box-file-input.component.html',
  styleUrl: './box-file-input.component.scss'
})
export class BoxFileInputComponent {
  fileId:FormControl = new FormControl(environment.BoxPreviewFileID, [Validators.required]);
  fileName:any = new FormControl('???', []);

  @Output('fileId') validatedFileIdChange: EventEmitter<string> = new EventEmitter<string>();
  private _validatedFileId: string = environment.BoxPreviewFileID;

  get validatedFileId(): string {
    return this._validatedFileId;
  }

  set validatedFileId(value: string) {
    this._validatedFileId = value;
    this.validatedFileIdChange.emit(this._validatedFileId);
  }

  constructor(private boxOauthTokenService: BoxOauthTokenService) {}

  public onValidateFileId() {
    console.debug('folderId:', this.fileId.value);
    this.boxOauthTokenService.boxClient.files.getFileById(this.fileId.value).then((file) => {
      this.fileName.setValue(file.name);
      this.validatedFileId = this.fileId.value.toString();
    }).catch((error) => {
      this.fileName.setValue('FILE NOT FOUND');
      console.error(error);
    })
  }

}
