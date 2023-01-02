import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserDeleteDialogComponent } from './components/user-delete-dialog/user-delete-dialog.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const COMPONENTS = [
  UserListComponent,
  UserCreateComponent,
  UserPageComponent,
  UserEditComponent,
  UserDeleteDialogComponent,
  ChangePasswordComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    AngularMaterialModule
  ]
})
export class UsersModule { }