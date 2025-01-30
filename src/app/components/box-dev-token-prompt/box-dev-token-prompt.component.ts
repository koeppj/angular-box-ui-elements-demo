import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BoxTokenService } from '@app/services/box-token.service';

@Component({
    selector: 'app-box-dev-token-prompt',
    templateUrl: './box-dev-token-prompt.component.html',
    styleUrls: ['./box-dev-token-prompt.component.scss'],
    imports: [ReactiveFormsModule]
})
export class BoxDevTokenPromptComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private boxTokenService: BoxTokenService) {
    this.form = this.fb.group({
      boxToken: ['']
    });

    this.form.get('boxToken')?.valueChanges.subscribe(value => {
      this.boxTokenService.setBoxToken(value);
    })
  }

}
