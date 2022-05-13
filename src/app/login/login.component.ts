import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonComponent } from '../common/common.component';
import { CommonService } from '../services/common.service';
import { LoginDetails, fieldsSettings } from '../types/login-details';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends CommonComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  fieldsSettings = fieldsSettings;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
  ) {
    super();
  }

  ngOnInit(): void {
    const fields = new LoginDetails();
    this.form = this.fb.group({ ...fields });
    this.setValidators();
  }

  setValidators(): void {
    this.fieldsSettings.map(setting => {
      if (setting.validation.indexOf('required') !== -1) {
        this.form.get(setting.id)?.addValidators(Validators.required);
      }
      if (setting.validation.indexOf('email') !== -1) {
        this.form.get(setting.id)?.addValidators(Validators.email);
      }
    })
  }


  submit(): void {
    if (this.form.valid) {
      this.commonService.sendLoginForm(this.form.value).subscribe(
        response => { this.handleResponse() },
        error => { this.handleError(error) }
      )
    }

  }


  override handleResponse(): void {
    this.commonService.login()
  }

}
