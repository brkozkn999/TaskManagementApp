import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../auth/service/storage/storage.service';
import { Router } from '@angular/router';

export type MenuItem = {
  icon:string;
  label:string;
  route:string;
}

@Component({
  selector: 'app-custom-sidenav-component',
  templateUrl: './custom-sidenav-component.component.html',
  styleUrl: './custom-sidenav-component.component.scss'
})
export class CustomSidenavComponentComponent {

  user:any;
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val:boolean) {
    this.sideNavCollapsed.set(val);
  }

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event=>{
      this.user = StorageService.getUser();
    })
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: '/admin/dashboard',
    },
    {
      icon: 'add_box',
      label: 'Post Task',
      route: '/admin/task',
    }
  ]);

  profilePicSize = computed(() => this.sideNavCollapsed() ? '42' : '100');
}
