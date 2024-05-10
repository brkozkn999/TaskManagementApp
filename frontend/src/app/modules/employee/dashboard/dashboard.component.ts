import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  listOfTasks: any = [];
  constructor(private service: EmployeeService,
    private snackbar: MatSnackBar) {
    this.getEmployeeTasks();
  }

  getEmployeeTasks() {
    this.service.getAllEmployeeTasks().subscribe((res)=> {
      this.listOfTasks = res;
      this.sortTasksByDueDate();
    })
  }

  sortTasksByDueDate(): void {
    this.listOfTasks.sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }
}
