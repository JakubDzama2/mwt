import { Component, OnInit } from '@angular/core';
import { User } from 'src/entities/User';
import { UsersServerService } from 'src/services/users-server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userToEdit = new User("", "");

  constructor(private usersServerService: UsersServerService, private router: Router) { }

  ngOnInit(): void {
  }

  saveUser(user: User) {
    this.usersServerService.saveUser(user).subscribe(() => {
      this.router.navigateByUrl("/users/extended");
    });
  }

}
