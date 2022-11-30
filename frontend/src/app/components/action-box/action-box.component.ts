import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { EventsService } from 'src/app/service/events.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'action-box',
  templateUrl: './action-box.component.html',
  styleUrls: ['./action-box.component.css']
})
export class ActionBoxComponent implements OnInit {

  @Input() title?: string;
  @Input() childData?: any;
  status = 'Save';
  success = false;
  error = false;

  constructor(
    private events: EventsService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
  }

  closeActionBox() {
    this.events.publish('app:open-action', null);
  }

  onUpdateForm(data?: any): void {
    const response = this.employeeService.updateEmployees(data.value);
    response.subscribe(response => {
      if (response) {
        this.success = true;
        this.status = 'Saved!';
        setTimeout(() => {
          this.closeActionBox();
          this.events.publish('dashboard:refresh');
        }, 3000);
      }
    });
  }
}
