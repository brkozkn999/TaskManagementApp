import { Component, computed, Inject, OnInit, Renderer2, signal } from '@angular/core';
import { StorageService } from './auth/service/storage/storage.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

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

  constructor(private router: Router,
              private render: Renderer2,
              @Inject(DOCUMENT) private document:Document)
              {

              }

  ngOnInit() {
    this.render.addClass(this.document.body, 'lightTheme')
    this.router.events.subscribe(event=>{
      this.isEmployeeLogged = StorageService.isEmployeeLoggedIn();
      this.isAdminLogged = StorageService.isAdminLoggedIn();
    })
  }

  logout() {
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }

  //fix this
  changeTheme(themeValue:string) {
    this.render.removeClass(this.document.body, 'lightTheme')
    this.render.removeClass(this.document.body, 'darkTheme')

    if (themeValue == 'light')
      this.render.removeClass(this.document.body, 'lightTheme')
    else if (themeValue == 'dark')
      this.render.addClass(this.document.body, 'darkTheme')
  }
} 
