import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private http:HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    const response = this.http.get<Employee[]>(`${environment.server_url}/users`);
    return response;
  }

  updateEmployees(data: Employee) {
    const response = this.http.patch<Employee>(`${environment.server_url}/users`, data);
    return response;
  }

  deleteEmployee(id: string) {
    const response = this.http.delete<Employee>(`${environment.server_url}/users/${id}`)
    return response;
  }
}
