import { ChangePassword } from './../../store/users/user.state.action';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from 'src/app/shared/directives/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public passwordForm!: FormGroup;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$')]],
      confirmPassword: ['', [Validators.required, MustMatch]]
    },
      {
        validator: MustMatch('newPassword', 'confirmPassword')
      });
    // this.userInfo = localStorage.getItem('userLoginData') || "";
    // this.userId = JSON.parse(this.userInfo)._id;
    // this.password = this.userInfo.password;
  }

  public myError = (controlName: string, errorName: string) => {
    return this.passwordForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      // this.id = this.activatedRoute.snapshot.params['id'];
      const id = this.activatedRoute.snapshot.params['id'];
      console.log(id);

      const payload = {
        oldPassword: this.passwordForm.controls['oldPassword'].value,
        newPassword: this.passwordForm.controls['newPassword'].value,
        confirmPassword: this.passwordForm.controls['confirmPassword'].value
      };
      console.log(payload);
      this.store.dispatch(new ChangePassword(id, payload)).subscribe(() => {
        this.router.navigate(['/'])
      })
    }
  }

  clearForm() {
    this.passwordForm.reset();
  }
}
