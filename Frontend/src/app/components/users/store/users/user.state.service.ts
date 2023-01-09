import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import { IUserStateModel } from './user.state.model';

@Injectable()
export class UserStateService {
  constructor(private httpClient: HttpClient) {}

  public getUser(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/users`);
  }

  createUser(payload: IUserStateModel): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/users`, payload);
  }

  updateUser(payload: IUserStateModel, id: number): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/users/` + id, payload)
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/users/` + id)
  }

}
