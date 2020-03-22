import { Component, OnInit } from '@angular/core';
import { User } from 'src/entities/User';
import { UsersServerService } from 'src/services/users-server.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [
    new User("Peter", "peto@peto.sk"),
    new User("Jožo", "jozo@peto.sk", 2, new Date("2020-01-17")),
    { name: "Jano", email: "jano@peto.sk", password: '', active: true,  groups: [] }
  ];

  selectedUser: User;
  users$: Observable<User[]>;
  columnsToDisplay=[ "id", "name", "email"];

  constructor(private usersServerService: UsersServerService) { }

  ngOnInit(): void {
    this.usersServerService.getUsers().subscribe(
        users => this.users = users,
        error => window.alert("Máme chybu:" + JSON.stringify(error)));
    this.users$ = this.usersServerService.getUsers();
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

}
