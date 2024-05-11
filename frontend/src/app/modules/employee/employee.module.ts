import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemoAngularMaterialModule } from '../../DemoAngularMaterialModule';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FiterpipePipe } from './dashboard/fiterpipe.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    UpdateTaskComponent,
    FiterpipePipe
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterialModule
  ]
})
export class EmployeeModule { }
