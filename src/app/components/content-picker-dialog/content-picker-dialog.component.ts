import { Component, Input, OnInit } from '@angular/core';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentPickerComponent } from '../content-picker/content-picker.component';
import { CommonModule } from '@angular/common';
import { BoxComponentsType } from '@app/enums/box-component-enum';

@Component({
  selector: 'app-content-picker-dialog',
  imports: [ContentPickerComponent, CommonModule],
  templateUrl: './content-picker-dialog.component.html',
  styleUrl: './content-picker-dialog.component.scss',
  standalone: true
})
export class ContentPickerDialogComponent {
  @Input() entityId: string | undefined = '0';
  @Input() componentId: string | undefined = 'box-abstact-component';
  @Input() options: any = {};
  @Input() boxComponent: BoxComponentsType = BoxComponentsType.ContentPicker;
  constructor(public activeModal: NgbActiveModal, 
              public boxOAthTokenService: BoxOauthTokenService) {
  }

  public onSelectItems(items: any) {
    if (items) {
      this.activeModal.close(items);
    } else {
      this.activeModal.dismiss("Camcel pressed..");
    }
  }

}
