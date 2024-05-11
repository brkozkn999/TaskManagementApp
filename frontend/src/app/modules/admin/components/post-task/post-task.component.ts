import { Component  } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.scss']
})
export class PostTaskComponent {
  taskForm!: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];
  listOfStatus: any = ["PENDING", "INPROGRESS", "COMPLETED", "DEFERRED", "CANCELLED"];

  constructor(private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router:Router,
    private location: Location)
    {
    this.getUsers();
    this.taskForm = this.fb.group({
      employeeId:[null, [Validators.required]],
      title:[null, [Validators.required]],
      description:[null, [Validators.required]],
      dueDate:[null, [Validators.required]],
      priority:[null, [Validators.required]],
      taskStatus:[null, [Validators.required]]
    })
  }

  getUsers() {
    this.adminService.getUser().subscribe((res)=>{
      this.listOfEmployees = res;
      console.log(res);
    })
  }

  refresh() : void {
    this.router.navigateByUrl("/admin/dashboard", {skipLocationChange: true}).then(() => {
      console.log(decodeURI(this.location.path()));
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

  postTask() {
    console.log("hey" + this.taskForm.value);
    this.adminService.postTasks(this.taskForm.value).subscribe((res)=> {
      if (res.id !== null) {
        this.snackBar.open("Task posted successfully!", "Close", {duration:5000});
        this.router.navigateByUrl("/admin/dashboard");
      }
      else {
        this.snackBar.open("Something went wrong.", "ERROR", {duration:5000});
      }
    })
  }
}
