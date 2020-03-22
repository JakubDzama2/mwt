import { Injectable } from '@angular/core';
import { User } from 'src/entities/User';
import { of, Observable, throwError, EMPTY, Subscribable, Subscriber } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Auth } from 'src/entities/auth';
import { SnackbarService } from './snackbar.service';
import { Group } from 'src/entities/group';

@Injectable({
  providedIn: 'root'
})
export class UsersServerService {

  localUsers = [new User("Janka", "janka@janka.sk"), new User("Danka", "danka@danka.sk")];
  url = "http://localhost:8080/"
  loggedUserSubscriber: Subscriber<string>; // zaciatok prudu (producent)
  redirectAfterLogin = "/users/extended";

  constructor(private http: HttpClient, private snackBarService: SnackbarService) { }

  get token(): string {
    return localStorage.getItem("token");
  }

  set token(token: string) {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }

  get user(): string {
    return localStorage.getItem("user");
  }

  set user(user: string) {
    if (user) {
      localStorage.setItem("user", user);
    } else {
      localStorage.removeItem("user");
    }
  }

  getCurrentUser(): Observable<string> {
    return new Observable<string>(subcriber => {
      this.loggedUserSubscriber = subcriber;
      subcriber.next(this.user);
    });
  }

  getLocalUsers(): Observable<User[]> {
    return of(this.localUsers);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.url + "user/" + id + "/" + this.token)
    .pipe(catchError(error => this.processHttpError(error)))
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.url + "users")
      .pipe(catchError(error => this.processHttpError(error)));
  }

  getGroups(): Observable<Group[]> {
    return this.http
      .get<Group[]>(this.url + "groups")
      .pipe(catchError(error => this.processHttpError(error)));
  }

  getExtendedUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.url + "users/" + this.token)
      .pipe(catchError(error => this.processHttpError(error)));
  }

  login(auth: Auth): Observable<boolean> {
    return this.http.post(this.url + "login", auth, { responseType: 'text' })
      .pipe(
        map(token => {
          this.token = token;
          this.user = auth.name;
          this.loggedUserSubscriber.next(this.user);
          this.snackBarService.successMessage("Login successfull!");
          return true;
        }),
        catchError(error => this.processHttpError(error)));
  }

  logout() {
    this.http
      .get(this.url + "logout/" + this.token)
      .pipe(
        catchError(error => this.processHttpError(error))
      )
      .subscribe()
    this.user = null;
    this.token = null;
    this.loggedUserSubscriber.next(null);
  }

  userConflits(user: User): Observable<string[]> {
    return this.http.post<string[]>(this.url + "user-conflicts", user)
    .pipe(catchError(error => this.processHttpError(error)));
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.url + "register", user)
    .pipe(catchError(error => this.processHttpError(error)));
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + "users/" + this.token, user)
    .pipe(catchError(error => this.processHttpError(error)));
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.http
    .delete(this.url + "user/" + userId + "/" + this.token)
    .pipe(map(() => true))
    .pipe(catchError(error => this.processHttpError(error)));
  }

  private processHttpError(error) {
    if (error instanceof HttpErrorResponse) {
      this.httpErrorToMessage(error);
      return EMPTY;
    }
    return throwError(error);
  }

  private httpErrorToMessage(error: HttpErrorResponse): void {
    console.log(JSON.stringify(error));
    if (error.status === 0) {
      this.snackBarService.errorMessage("Server unreachable");
      return;
    }
    if (error.status >= 400 && error.status <= 500) {
      if (error.error.errorMessage) {
        this.snackBarService.errorMessage(error.error.errorMessage);
      } else {
        this.snackBarService.errorMessage(JSON.parse(error.error).errorMessage);
      }
      return;
    }
    this.snackBarService.errorMessage("server error: " + error.message);
  }
}
