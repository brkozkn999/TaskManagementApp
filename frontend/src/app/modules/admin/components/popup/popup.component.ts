import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'
import { AdminService } from '../../services/admin.service'
import { PopupDialogData } from './model/popup-dialog-data';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent implements OnInit {

  listOfTasks: any = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: PopupDialogData,
              private service: AdminService) {
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.service.getAllTasks().subscribe((res)=> {
      this.listOfTasks = res;
    })
  }

  deleteTask() {
    this.service.deleteTasks(this.data.id).subscribe((res) => {
      this.getTasks();
    })
  }
}