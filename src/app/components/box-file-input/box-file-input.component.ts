import { Component, EventEmitter, Output, WritableSignal, TemplateRef, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { NgbActiveOffcanvas, NgbModal, NgbModalModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { environment } from '@environment/environment';
import { ContentPickerDialogComponent } from '../content-picker-dialog/content-picker-dialog.component';
import { BoxComponentsType } from '@app/enums/box-component-enum';
import { CommonModule } from '@angular/common';
import { ContentPickerComponent } from '../content-picker/content-picker.component';

@Component({
  selector: 'app-box-file-input',
  imports: [ReactiveFormsModule,NgbModalModule,CommonModule,ContentPickerComponent],
  templateUrl: './box-file-input.component.html',
  styleUrl: './box-file-input.component.scss',
  standalone: true
})
export class BoxFileInputComponent {
  fileId:FormControl = new FormControl(environment.BoxPreviewFileID, [Validators.required]);
  fileName:any = new FormControl('???', []);
  closeResult: WritableSignal<string>= signal('');

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
    private modal: NgbModal,
    private NgbOffcancas: NgbOffcanvas,
    private NgbActiveOffcanvas: NgbActiveOffcanvas) {}

  open(content: TemplateRef<any>) {
    this.NgbOffcancas.open(content).result.then(
      (result) => {
        console.debug(result);
      },
      (reason) => {

      }
    )
  }

  onSelectItems(items: any) {
    if (items) {
      this.NgbActiveOffcanvas.close(items)
    } else {
      this.NgbActiveOffcanvas.dismiss("Cancel")
    }
  }

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
