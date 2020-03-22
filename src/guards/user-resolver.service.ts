import { Injectable } from '@angular/core';
import { User } from 'src/entities/User';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersServerService } from 'src/services/users-server.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User> {
  
  constructor(private usersServerService: UsersServerService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    return this.usersServerService.getUser(+route.paramMap.get('id'));
  }
  
}
