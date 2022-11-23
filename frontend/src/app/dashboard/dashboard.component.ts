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
  min_salary:any;
  max_salary:any;
  sortStatus = {
    active: '',
    id: 1,
    name: 1,
    login: 1,
    salary: 1
  }
  file:any = null;

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
      },
      {
        id: 'e0003',
        name: 'Severus Snape',
        login: 'ssnape',
        salary: 4000.00
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

  sort(type: string) {
    this.sortStatus.active = type;
    let status:any = this.sortStatus;
    status[type] = status[type] === 1 ? -1 : 1;
    this.filtered_employees.sort((a:any,b:any) => {
      const empA = a[type];
      const empB = b[type];

      let comparison = 0;
      if (empA > empB) {
        comparison = 1;
      } else if (empA < empB) {
        comparison = -1;
      }

      return comparison * +status[type];
    });
    console.log(this.sortStatus);
  }

  async onChange(event: any) {
    this.file = await event.target.files[0];
    console.log('on change: ', this.file);
  }

  onUpload() {
    console.log(this.file);
  }
}
