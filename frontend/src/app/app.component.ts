import { Component, computed, OnInit, signal } from '@angular/core';
import { StorageService } from './auth/service/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isEmployeeLogged: boolean = StorageService.isEmployeeLoggedIn();
  isAdminLogged: boolean = StorageService.isAdminLoggedIn();
  
  collapsed = signal(false);
  sidenavWitdh = computed(() => this.collapsed() ? '65px' : '250px');

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event=>{
      this.isEmployeeLogged = StorageService.isEmployeeLoggedIn();
      this.isAdminLogged = StorageService.isAdminLoggedIn();
    })
  }

  logout() {
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
