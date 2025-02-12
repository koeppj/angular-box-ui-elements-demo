import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
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


  constructor(public boxOauthTokenService: BoxOauthTokenService, private modal: NgbModal) {}

  public onSelectFile() {
    this.selectingFile = true;
    const modalRef = this.modal.open(ContentPickerDialogComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });

    modalRef.componentInstance.entityId = "0"
    modalRef.componentInstance.boxComponent = BoxComponentsType.FilePicker
    modalRef.componentInstance.options = {
      maxSelectable: 1
    };

    modalRef.result.then((result: any) => {
      const selectedFileId = result[0].id;
      const selectedName = result[0].name;
      this.fileName.setValue(selectedName);
      this._validatedFileId = selectedFileId;
      console.debug(`Select File: ${selectedFileId} - ${selectedName}`)
      this.selectingFile = false;
    }).catch((reason: any) => {
      this.selectingFile = false;
      console.log(reason);
    });

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
