import { Component, EventEmitter, Output, WritableSignal, TemplateRef, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { environment } from '@environment/environment';
import { BoxComponentsType } from '@app/enums/box-component-enum';
import { CommonModule } from '@angular/common';
import { ContentPickerComponent } from '../content-picker/content-picker.component';

@Component({
  selector: 'app-box-file-input',
  imports: [ReactiveFormsModule,CommonModule,ContentPickerComponent],
  templateUrl: './box-file-input.component.html',
  styleUrl: './box-file-input.component.scss',
  standalone: true
})
export class BoxFileInputComponent {
  fileId:FormControl = new FormControl(environment.BoxPreviewFileID, [Validators.required]);
  fileName:any = new FormControl('???', []);
  options = {
    maxSelectable: 1,
    canUpload: false,
    canSetShareAccess: false,
    canCreateNewFolder: false,
    autoFocus: true,
  }
  boxComponent = BoxComponentsType.FilePicker;

  @Output('selectingFile') selectingFileChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _selectingFile: boolean = true;
  get selectingFile(): boolean {
    return this._selectingFile
  }

  set selectingFile(value: boolean) {
    this._selectingFile = value;
    this.selectingFileChange.emit(this._selectingFile);
  }

  @Output('fileId') validatedFileIdChange: EventEmitter<string> = new EventEmitter<string>();
  private _validatedFileId: string = environment.BoxPreviewFileID;

  get validatedFileId(): string {
    return this._validatedFileId;
  }

  set validatedFileId(value: string) {
    this._validatedFileId = value;
    this.validatedFileIdChange.emit(this._validatedFileId);
  }


  constructor(public boxOauthTokenService: BoxOauthTokenService, 
    private NgbOffcanvas: NgbOffcanvas) {}

  open(content: TemplateRef<any>) {
    this.NgbOffcanvas.open(content).result.then(
      (result) => {
        console.debug(result);
      },
      (reason) => {
        switch (reason) {
          case OffcanvasDismissReasons.BACKDROP_CLICK:
            break;
          case OffcanvasDismissReasons.ESC:
            break;
          case "Cancel":
            break;
          default: {
            this.validatedFileId = reason[0].id;
            this.fileName.setValue(reason[0].name);
          }
        }
      }
    )
  }

  onSelectItems(items: any) {
    if (items) {
      this.NgbOffcanvas.dismiss(items);
    } else {
      this.NgbOffcanvas.dismiss("Cancel")
    }
  }

}
