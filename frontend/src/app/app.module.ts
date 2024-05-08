import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DemoAngularMaterialModule } from './DemoAngularMaterialModule';
import { MatToolbar } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './modules/employee/dashboard/dashboard.component';
import { CustomSidenavComponentComponent } from './components/custom-sidenav-component/custom-sidenav-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CustomSidenavComponentComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoAngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatToolbar
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
