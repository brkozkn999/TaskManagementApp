import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../../../../auth/service/popup/popup.service';

interface TaskPriority {
  LOW: number;
  MEDIUM: number;
  HIGH: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  listOfTasks: any = [];
  constructor(private service: AdminService,
              private popupService: PopupService,
              private snackbar: MatSnackBar) {
    this.getTasks();
  }

  getTasks() {
    this.service.getAllTasks().subscribe((res)=> {
      this.listOfTasks = res;
      this.sortTasksByToggleValue('desc-date');
    })
  }

  openDialog(task:any) {
    this.popupService.popupDialog({
      id: task.id,
      title: task.title
    });
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