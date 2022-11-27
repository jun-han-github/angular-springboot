import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

type Employee = {
  id: string,
  name: string,
  login: string,
  salary: number
}

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private http:HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    const response = this.http.get<Employee[]>(`${environment.server_url}/users`);
    return response;
  }
}
