import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class UserService {
  constructor (
      private httpClient: HttpClient
  ) {}

  public createUser (username: string, password: string): Observable<any> {
    return this.httpClient.post('https://localhost:44353/api/users', { Username: username, Password: password });
  }
}
