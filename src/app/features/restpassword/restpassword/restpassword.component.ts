import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-restpassword',
  styleUrl: './restpassword.component.css',
  templateUrl: './restpassword.component.html',
})
export class RestpasswordComponent {
  email = new FormGroup(null , Validators.required)
  restCode = new FormGroup(null , Validators.required)
  newPassword = new FormGroup(null , Validators.required)



  // myForm = this._FormBilder.group({

  // })
}
