import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonComponent } from '../common/common.component';
import { CommonService } from '../services/common.service';
import { fieldsSettings, Person, PersonDetails } from '../types/person-details';

@Component({
  selector: 'app-add-new-person',
  templateUrl: './add-new-person.component.html',
  styleUrls: ['./add-new-person.component.scss']
})
export class AddNewPersonComponent extends CommonComponent implements OnInit {
  fieldsSettings = fieldsSettings;

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<AddNewPersonComponent>,
    public snackbar: MatSnackBar,
  ) {
    super()
  }

  ngOnInit(): void {
    const fields = new Person();
    this.form = this.fb.group({ ...fields })
    this.setValidators();
  }

  setValidators(): void {
    this.fieldsSettings.map(setting => {
      if (setting.validation.indexOf('required') !== -1) {
        this.form.get(setting.id)?.addValidators(Validators.required)
      }
      if (setting.validation.indexOf('email') !== -1) {
        this.form.get(setting.id)?.addValidators(Validators.email)
      }
    })
  }

  addNew() {
    if (this.form.valid) {
      this.commonService.addNewPerson(this.form.value).subscribe(
        response => this.handleResponse(response)
      )
    }
  }

  override handleResponse(response: PersonDetails): void {
    this.dialogRef.close({
      person: response
    })
    this.snackbar.open("Person created successfully!", 'close', {
      duration: 3000
    });
  }

}
