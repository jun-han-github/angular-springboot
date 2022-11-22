import { Component, OnInit } from '@angular/core';

type Employee = {
  id: string,
  name: string,
  login: string,
  salary: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  employees:Employee[] = [];
  filtered_employees:Employee[] = [];
  city = '';
  min_salary:any;
  max_salary:any;

  ngOnInit(): void {
    this.employees = [
      {
        id: 'e0001',
        name: 'Liu Junhan',
        login: 'junhan123',
        salary: 423.40
      },
      {
        id: 'e0002',
        name: 'Harry Potter',
        login: 'hpotter',
        salary: 1000.00
      }
    ]

    this.filtered_employees = this.employees;
    this.findMaxSalary();
  }

  findMaxSalary() {
    const { salary } = this.employees.sort((a,b) => b.salary - a.salary)[0];
    this.max_salary = salary;
  }

  search() {
    const minimum = this.min_salary ?? 0;
    const maximum = this.max_salary ?? 0;

    this.filtered_employees = this.employees.filter(e => {
      if (minimum && maximum) {
        return e.salary >= minimum && e.salary <= maximum;
      }

      if (maximum) {
        return e.salary <= maximum;
      }

      if (minimum) {
        return e.salary >= minimum;
      }

      return e;
    });
  }
}
