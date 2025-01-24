import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';

@Component({
  selector: 'app-box-folder-input',
  templateUrl: './box-folder-input.component.html',
  styleUrl: './box-folder-input.component.scss',
  imports: [ReactiveFormsModule]
})
export class BoxFolderInputComponent {

  folderId:FormControl = new FormControl('0', [Validators.required]);
  folderName:any = new FormControl('All', []);

  @Output('folderId') validatedFolderIdChange: EventEmitter<string> = new EventEmitter<string>();
  private _validatedFolderId: string = '0';

  get validatedFolderId(): string {
    return this._validatedFolderId;
  }

  set validatedFolderId(value: string) {
    this._validatedFolderId = value;
    this.validatedFolderIdChange.emit(this._validatedFolderId);
  }

  constructor(private boxOauthTokenService: BoxOauthTokenService) {}

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


