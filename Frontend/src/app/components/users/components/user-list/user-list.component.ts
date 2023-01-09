import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserDeleteDialogComponent } from '../user-delete-dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UsersState } from '../../store/users/user.state';
import { DeleteUser, GetUsers, SetSelectedUser } from '../../store/users/user.state.action';
import { IUserStateModel } from '../../store/users/user.state.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Select(UsersState.getUserList) users$: Observable<IUserStateModel[]>;

  displayedColumns: string[] = ['name', 'email', 'created_user_id', 'phone', 'dob', 'address', 'created_at', 'updated_at', 'action'];
  public dataSource!: MatTableDataSource<any>;
  public userList: IUserStateModel[] = [];
  username = "";
  email = "";
  fromDate = "";
  toDate = "";
  today = new Date();
 

  public dataSubject: any = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog,private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetUsers());

    this.users$.subscribe((dist:any) =>{
      this.userList = dist;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
    })
   
  }

  deleteUserData(data: any) {
    let dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      width: '40%',
      data: data,
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.store.dispatch(new DeleteUser(data.id));
      this.router.navigate(['/user'])
    });
  }

  editUserData(payload:User){
    this.store.dispatch(new SetSelectedUser(payload));
    this.router.navigate(['/user/edit/' + payload.id])
  }

  onClickUserCreate() {
    this.router.navigate(['/user/create']);
  }
}
