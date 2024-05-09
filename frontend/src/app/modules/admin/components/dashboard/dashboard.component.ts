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
    })
  }

  deleteTask(id:number) {
    this.service.deleteTasks(id).subscribe((res) => {
      this.snackbar.open("Task deleted successfully.", "Close", {duration: 5000});
      this.getTasks();
    })
  }
  //deleteTask(task.id)
  openDialog(task:any) {
    this.popupService.popupDialog({
      id: task.id,
      title: task.title
    });
  }
}
