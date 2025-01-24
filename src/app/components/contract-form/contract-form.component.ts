import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';


@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrl: './contract-form.component.scss',
  imports: [ReactiveFormsModule,CommonModule]
})
export class ContractFormComponent implements OnInit {
  @Input() folderId: string | undefined = '0';

  contractForm!: FormGroup;
  submitted = false;

  contractTypes = ['Type 1', 'Type 2', 'Type 3'];
  riskLevels = ['Low', 'Medium', 'High'];

  constructor(private boxOAuthTokenService: BoxOauthTokenService,
              private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.contractForm = new FormGroup({
      externalPartyName: new FormControl('', Validators.required),
      contractType: new FormControl('', Validators.required),
      riskLevel: new FormControl('', Validators.required),
      layer: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      autoReview: new FormControl('', Validators.required),
      attachent: new FormControl('', Validators.required),
    });
  }

  // For easy access to form fields in the template
  get f() {
    return this.contractForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop if the form is invalid
    if (this.contractForm.invalid) {
      return;
    }

    let formData = new FormData();

    const attrs = {
      name: this.contractForm.value.attachent.name,
      parent: { id: this.folderId },
    };
    

    // Handle valid form data here
    console.log('Contract Form submitted successfully:', this.contractForm.value);
  }
}
