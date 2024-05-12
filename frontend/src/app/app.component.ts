import { Component, computed, HostBinding, Inject, OnInit, Renderer2, signal } from '@angular/core';
import { StorageService } from './auth/service/storage/storage.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // StyleUrl instead of styleUrl
})
export class AppComponent {
  isEmployeeLogged: boolean = StorageService.isEmployeeLoggedIn();
  isAdminLogged: boolean = StorageService.isAdminLoggedIn();
  collapsed = signal(false);
  sidenavWitdh = computed(() => this.collapsed() ? '65px' : '250px');

  switchTheme = new FormControl(false)
  @HostBinding('class') className = ''
  darkClass = 'dark-theme'
  lightClass = 'light-theme'
  @HostBinding('class.dark-theme') isDarkTheme = false;

  constructor(private router: Router,
              private render: Renderer2,
              private overlay: OverlayContainer) {

    }

    toggleCollapse() {
      this.collapsed.set(!this.collapsed());
    }

  ngOnInit() {
    this.switchTheme.valueChanges.subscribe((res) => {
      this.isDarkTheme = res!;
      this.className = res ? this.darkClass : this.lightClass

      if (res)
        this.overlay.getContainerElement().classList.add(this.darkClass);
      else
      this.overlay.getContainerElement().classList.remove(this.darkClass);
    })
    this.router.events.subscribe(event=>{
      this.isEmployeeLogged = StorageService.isEmployeeLoggedIn();
      this.isAdminLogged = StorageService.isAdminLoggedIn();
    })
  }

  logout() {
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }

  toggleTheme() {
    this.switchTheme.setValue(!this.switchTheme.value);
  }
}
