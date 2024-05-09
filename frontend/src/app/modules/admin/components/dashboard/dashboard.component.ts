import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../../../../auth/service/popup/popup.service';

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
      this.sortTasksByDueDate();
    })
  }

  sortTasksByDueDate(): void {
    this.listOfTasks.sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

  openDialog(task:any) {
    this.popupService.popupDialog({
      id: task.id,
      title: task.title
    });
  }
}