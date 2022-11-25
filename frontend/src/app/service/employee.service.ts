import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  baseUrl = "http://localhost:8081";

  constructor(private http:HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    const response = this.http.get<Employee[]>(`${this.baseUrl}/users`);
    return response;
  }
}
