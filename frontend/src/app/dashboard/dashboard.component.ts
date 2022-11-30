import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { FileUploadService } from '../service/file-upload.service';
import Swal from 'sweetalert2';
import { Employee } from '../interfaces/employee';
import { EventsService } from '../service/events.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  constructor(
    private fileUploadService: FileUploadService,
    private employeeService: EmployeeService,
    private events: EventsService
  ) { }

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

  edit_employee = false;

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filtered_employees = this.employees;
      this.findMaxSalary();
    });
  }

  findMaxSalary() {
    if (this.employees.length > 0) {
      const { salary } = this.employees.sort((a,b) => b.salary - a.salary)[0];
      this.max_salary = salary;
    }
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

  openActionBox(employeeData: Employee) {
    this.events.publish('app:open-action', { title: 'Employee', data: employeeData });
  }

  async onFileUpload(event: any) {
    const fileCount = event.target.files.length;
    const fileSplitFormat = this.isMacDevice() ? '\n' : '\r\n';

    let employeeArray: Employee[] = [];
    for (let i=0; i < fileCount; i++) {
      const fileData = await event.target.files[i].text();
      let employeeData: Employee[] = [];
      let propertyNames: string[] = fileData.slice(0, fileData.indexOf(fileSplitFormat)).split(',');

      if (
        propertyNames[0] !== 'id' ||
        propertyNames[1] !== 'login' ||
        propertyNames[2] !== 'name' ||
        propertyNames[3] !== 'salary' ||
        propertyNames.length > 4
      ) {
        Swal.fire('Incorrect columns', `File: '${event.target.files[i].name}' has incorrect columns: `, 'error');
        event.target.value = null;
        return;
      }

      employeeData = fileData.slice(fileData.indexOf('\n') + 1).split(fileSplitFormat);

      const corruptedData = this.isCorrupted(employeeData);
      if (corruptedData.length !== 0) {
        Swal.fire('Corrupted data', `File: '${event.target.files[i].name}' seems to be corrupted around these entries:<br>${corruptedData.join('<br>')}`, 'error');
        event.target.value = null;
        return;
      }

      employeeData = this.sanitizeData(employeeData);
      if (employeeData.length === 0) {
        Swal.fire('Empty file', `File: '${event.target.files[i].name}' is empty and won\'t be processed.`, 'error');
        event.target.value = null;
      }

      employeeData = this.convertCSVtoJSONArray(employeeData, propertyNames);
      employeeArray = [...employeeArray, ...employeeData];
    }

    const duplicates = this.checkDuplicateIdAndLogin(employeeArray);
    if (duplicates.length !== 0) {
      const description = event.target.files.length === 1 ? 'in ' + event.target.files[0].name : 'across all uploaded files';
      Swal.fire('Duplicate found', `Please check these value(s) ${description}:<br>${duplicates.join('<br>')}`, 'error');
      event.target.value = null;
      return;
    }
    this.file = employeeArray;
    if (this.file && this.file.length !== 0) {
      Swal.fire('Validation', 'All file checks have passed. You may upload.', 'success');
    }
  }

  isMacDevice(): boolean {
    return navigator.userAgent.includes('Mac');
  }

  checkDuplicateIdAndLogin(employeeArray: Employee[]) {
    let checkIdArray: string[] = [];
    let checkLoginArray: string[] = [];
    let duplicates: string[] = [];

    employeeArray.map((employee: any) => {
      const idExist = checkIdArray.includes(employee.id);
      const loginExist = checkLoginArray.includes(employee.login);
      if (!idExist) {
        checkIdArray.push(employee.id);
      } else {
        duplicates.push('id:' + employee.id)
      }

      if (!loginExist) {
        checkLoginArray.push(employee.login);
      } else {
        duplicates.push('login:' + employee.login)
      }
    });

    return duplicates;
  }

  isCorrupted(data: Array<any>) {
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/;
    return data.filter(data => {
      return (
        format.test(data) || data.includes(',,') || data.startsWith(',') || data.endsWith(',')
      ) && data[0] !== '#' && data !== ',,,';
    });
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
      Swal.fire('Error', 'Couldn\'t upload because file is empty.', 'error');
      return;
    }

    this.fileUploadService.upload(this.file).subscribe(response => {
      Swal.fire('Completed', `Successfully uploaded ${response.length} entries.`, 'success');
      this.getAllEmployees();
    }, error => {
      Swal.fire('Error', error.message, 'error');
    });
  }
}
