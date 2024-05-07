import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss'
})
export class UpdateTaskComponent {
  employeeTaskUpdateForm!: FormGroup;
  id: number;
  listOfStatus: any = ["PENDING", "INPROGRESS", "COMPLETED", "DEFERRED", "CANCELLED"];

  constructor(private service:EmployeeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router:Router) {
    this.id = +this.route.snapshot.params['id'];
    this.employeeTaskUpdateForm = this.fb.group({
      status:[null, [Validators.required]]
    })
  }

  updateTaskStatus() {
    this.service.updateTaskStatus(this.id, this.employeeTaskUpdateForm.value).subscribe((res) => {
      if (res.id !== null) {
        this.snackBar.open("Task posted successfully!", "Close", {duration:5000});
        this.router.navigateByUrl("/employee/dashboard");
      }
      else{
        this.snackBar.open("Something went wrong.", "ERROR", {duration:5000});
      }
    });
  }
}
