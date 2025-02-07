import { Component } from '@angular/core';
import { ContractListComponent } from "../../components/contract-list/contract-list.component";

@Component({
  selector: 'app-contract-list-page',
  imports: [ContractListPageComponent, ContractListComponent],
  templateUrl: './contract-list-page.component.html',
  styleUrl: './contract-list-page.component.scss'
})
export class ContractListPageComponent {

}
