import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';

interface TaskPriority {
  LOW: number;
  MEDIUM: number;
  HIGH: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  searchForm!: FormGroup;
  listOfTasks: any = [];
  searchText:string = '';

  constructor(private service: EmployeeService, 
    private fb: FormBuilder)
    {
    this.getEmployeeTasks();
    this.searchForm = this.fb.group({
      searchText:[null],
    })
  }

  getEmployeeTasks() {
    this.service.getAllEmployeeTasks().subscribe((res)=> {
      this.listOfTasks = res;
      this.sortTasksByToggleValue('desc-date');
    })
  }

  sortTasksByDueDateDesc(): void {
    this.listOfTasks.sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

  sortTasksByDueDateAsc(): void {
    this.listOfTasks.sort((a: any, b: any) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
  }

  sortTasksByPriorityDesc(): void {
    const priorityOrder: TaskPriority = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3 };
    this.listOfTasks.sort((a: any, b: any) => priorityOrder[a.priority as keyof TaskPriority] - priorityOrder[b.priority as keyof TaskPriority]);
  }

  sortTasksByPriorityAsc(): void {
    const priorityOrder: TaskPriority = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3 };
    this.listOfTasks.sort((a: any, b: any) => priorityOrder[b.priority as keyof TaskPriority] - priorityOrder[a.priority as keyof TaskPriority]);
  }

  sortTasksByToggleValue(value: string): void {
    switch (value) {
      case 'desc-date':
        this.sortTasksByDueDateDesc();
        break;
      case 'asc-date':
        this.sortTasksByDueDateAsc();
        break;
      case 'desc-priority':
        this.sortTasksByPriorityDesc();
        break;
      case 'asc-priority':
        this.sortTasksByPriorityAsc();
        break;
      default:
        this.sortTasksByDueDateDesc();
        break;
    }
  }
}
