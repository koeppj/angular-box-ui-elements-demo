import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ContentPickerComponent } from '../content-picker/content-picker.component';
import { BoxComponentsType } from '@app/enums/box-component-enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-box-folder-input',
  templateUrl: './box-folder-input.component.html',
  styleUrl: './box-folder-input.component.scss',
  imports: [ReactiveFormsModule,ContentPickerComponent,CommonModule],
  standalone: true
})
export class BoxFolderInputComponent {

  folderId:FormControl = new FormControl('0', [Validators.required]);
  folderName:any = new FormControl('All', []);
  options = {
    maxSelectable: 1,
    canUpload: false,
    canSetShareAccess: false,
    canCreateNewFolder: false,
    autoFocus: true,
  }
  boxComponent = BoxComponentsType.FilePicker;

  @Output('folderId') validatedFolderIdChange: EventEmitter<string> = new EventEmitter<string>();
  private _validatedFolderId: string = '0';

  get validatedFolderId(): string {
    return this._validatedFolderId;
  }

  set validatedFolderId(value: string) {
    this._validatedFolderId = value;
    this.validatedFolderIdChange.emit(this._validatedFolderId);
  }

  constructor(public boxOauthTokenService: BoxOauthTokenService,ngbOffCanvas: NgbOffcanvas) {}

  public onValidateFolderId() {
    console.debug('folderId:', this.folderId.value);
    this.boxOauthTokenService.boxClient.folders.getFolderById(this.folderId.value).then((folder) => {
      this.folderName.setValue(folder.name);
      this.validatedFolderId = this.folderId.value.toString();
    }).catch((error) => {
      console.error(error);
      this.folderName.setValue('FOLDER NOT FOUND');
    })
  }
}


