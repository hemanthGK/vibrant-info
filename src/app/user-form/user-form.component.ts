import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public apiService: ApiService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  registerForm: FormGroup = this.formBuilder.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.pattern('^[a-zA-Z -\']+'),
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z -\']+'),
      ],
    ],
    phoneNumber: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(16),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    pincode: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    ],
  });

  ngOnInit() {
    if (this.data) {
      this.registerForm.get('firstName').setValue(this.data.first_name);
      this.registerForm.get('lastName').setValue(this.data.last_name);
      this.registerForm.get('email').setValue(this.data.email);
    }
  }

  close() {
    this.dialogRef.close();
  }
  submitForm() {
    const data = {
      first_name: this.registerForm.get('firstName').value,
      last_name: this.registerForm.get('lastName').value,
      email: this.registerForm.get('email').value,
      address: this.registerForm.get('address').value,
      pincode: this.registerForm.get('pincode').value,
      phone_number: this.registerForm.get('phoneNumber').value,
    };
    if (!this.data) {
      this.apiService.callPostAPI('https://reqres.in/api/users', data)
        .subscribe((res) => {
            this.dialogRef.close(res);
          }, (error) => {
            console.log(error);
          });
    } else {
      this.apiService.callPutAPI('https://reqres.in/api/users/' + this.data.id, data)
        .subscribe((res) => {
            res.id = this.data.id;
            this.dialogRef.close(res);
          }, (error) => {
            console.log(error);
          });
    }
  }
}
