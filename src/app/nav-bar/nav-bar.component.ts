import { Component, OnInit } from '@angular/core';
import { UsersServerService } from 'src/services/users-server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  username: string = '';

  constructor(private userServerService: UsersServerService, private router: Router) { }

  ngOnInit(): void {
    this.userServerService.getCurrentUser().subscribe(username => {
      this.username = username;
    })
  }

  logout(): void {
    this.userServerService.logout();
    this.router.navigateByUrl("/login");
  }

}
