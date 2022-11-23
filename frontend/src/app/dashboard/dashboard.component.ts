import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploadService } from '../service/file-upload.service';

type Employee = {
  id: string,
  name: string,
  login: string,
  salary: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  constructor(private fileUploadService: FileUploadService) { }

  p: number = 1;
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
        name: 'Sample Liu',
        login: 'sample123',
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
  }

  async onFileUpload(event: any) {
    const fileData = await event.target.files[0].text();
    let employeeData: Employee[] = [];
    let propertyNames: string[] = fileData.slice(0, fileData.indexOf('\r\n')).split(',');

    employeeData = fileData.slice(fileData.indexOf('\n') + 1).split('\r\n');
    employeeData = this.sanitizeData(employeeData);

    if (employeeData.length === 0) {
      console.log('File is empty, can\'t proceed.');
      return;
    }
    employeeData = this.convertCSVtoJSONArray(employeeData, propertyNames);
    this.file = employeeData;
    this.viewUploadedEmployees(employeeData);
  }

  viewUploadedEmployees(data: Employee[]) {
    this.employees = data;
    this.filtered_employees = data;
    this.findMaxSalary();
  }

  sanitizeData(data: Array<any>) {
    return data.filter((data: any) => data[0] === 'e');
  }

  convertCSVtoJSONArray(dataRows: any, propertyNames: any) {
    return dataRows.map((data:any) => {
      let employee = data.split(',');
      let obj: any = new Object();

      for (let i=0; i< propertyNames.length; i++) {
        const property = propertyNames[i];

        let val: any = employee[i];
        obj[property] = property === 'salary' ? +val : val;
      }
      return obj;
    });
  }

  onUpload() {
    if (!this.file) {
      console.log('File is empty, can\'t upload.');
      return;
    }
    this.fileUploadService.upload(this.file);
  }
}
