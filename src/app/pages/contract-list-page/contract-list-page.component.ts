import { Component } from '@angular/core';
import { ContractListComponent } from "../../components/contract-list/contract-list.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapPlus } from '@ng-icons/bootstrap-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContractFormComponent } from '@app/components/contract-form/contract-form.component';

@Component({
  selector: 'app-contract-list-page',
  imports: [ContractListComponent, NgIcon],
  templateUrl: './contract-list-page.component.html',
  styleUrl: './contract-list-page.component.scss',
  providers: [provideIcons({bootstrapPlus})]
})
export class ContractListPageComponent {
  constructor(private modalService: NgbModal) {}

  createContract() {
    this.modalService.open(ContractFormComponent, {size: 'lg', modalDialogClass: 'my-modal'});
  }
}
