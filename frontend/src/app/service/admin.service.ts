import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  login(credentials: { [key: string]: string }): Observable<any> {
    return this.http.post(`${environment.server_url}/api/admin/login`, credentials, { responseType: 'text' });
  }
}
