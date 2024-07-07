import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {IUser} from "../../models/user";
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'create-edit-user',
  templateUrl: 'create-edit-user.component.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    FormsModule,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule
  ],
  standalone: true
})
export class CreateEditUserComponent implements OnInit {
  result: IUser;
  constructor(
    private usersService: UsersService,
    private dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IUser
  ) {
    this.form.patchValue(data);
  }

  isEdit = this.data ? true : false;

  ngOnInit(): void {
    console.log(this.data)
  }

  form = new FormGroup({
    name: new FormControl<string>(this.data?.name || '', Validators.compose([Validators.required, Validators.minLength(4)])),
    username: new FormControl<string>(this.data?.username || '', Validators.compose([Validators.required , Validators.minLength(4)])),
    phone: new FormControl<string>(this.data?.phone || '', Validators.compose([Validators.required, Validators.minLength(7)])),
    email: new FormControl<string>(this.data?.email || '', Validators.compose([Validators.required, Validators.email, Validators.minLength(4)])),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    const user = {
      id: this.data?.id || this.usersService.getMaxUserId() + 1 as number,
      name: this.form.value.name as string,
      username: this.form.value.username as string,
      phone: this.form.value.phone as string,
      email: this.form.value.email as string,
    }
   this.dialogRef.close(this.result = user);
  }
}
