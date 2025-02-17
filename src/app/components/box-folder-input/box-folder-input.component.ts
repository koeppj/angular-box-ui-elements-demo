import { Component, EventEmitter, Output, TemplateRef } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  boxComponent = BoxComponentsType.FolderPicker;

  @Output('folderId') validatedFolderIdChange: EventEmitter<string> = new EventEmitter<string>();
  private _validatedFolderId: string = '0';

  get validatedFolderId(): string {
    return this._validatedFolderId;
  }

  set validatedFolderId(value: string) {
    this._validatedFolderId = value;
    this.validatedFolderIdChange.emit(this._validatedFolderId);
  }

  constructor(public boxOauthTokenService: BoxOauthTokenService, private ngbOffCanvas: NgbOffcanvas) {}

  open(content: TemplateRef<any>) {
    this.ngbOffCanvas.open(content).result.then(
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
            this.validatedFolderId = reason[0].id;
            this.folderName.setValue(reason[0].name);
          }
        }
      }
    )
  }

  onSelectItems(items: any) {
    if (items) {
      this.ngbOffCanvas.dismiss(items);
    } else {
      this.ngbOffCanvas.dismiss("Cancel")
    }
  }
}


