import { Inject, Injectable } from '@angular/core';
import { User } from '../../Models/user.model';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<User>(undefined!);
  private readonly CURRENT_USER = 'currentuser';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router) {}

  // Sign-up
  register(user: User): Observable<any> {
    let api = `${environment.apiUrl}/api/auth/register`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  login(email: string, password: string) {
    console.log(`login at ${environment.apiUrl}/api/auth/login`);

    return this.http
      .post<any>(
        `${environment.apiUrl}/api/auth/login`,
        { email, password },
        { headers: this.headers }
      )
      .subscribe((response) => {
        if (!response) {
          window.alert('Invalid credentials');
        } else {
          console.log('response: ' + response);
          this.saveUserToLocalStorage(response);
          localStorage.setItem('access_token', response.token);
          localStorage.setItem('currentuser', JSON.stringify(response));
          this.currentUser$.next(response);
          console.log('currentUser$ = ' + this.currentUser$);
          console.log(localStorage);
          this.router.navigate(['home']);
        }
      });
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  // Logout
  logout() {
    console.log(localStorage);
    const removeToken = localStorage.removeItem('access_token');
    this.currentUser$.next(undefined!);
    localStorage.clear();
    this.isLoggedIn === false;
    console.log(localStorage);
    console.log(this.isLoggedIn);
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // get User
  getUserFromLocalStorage(): Observable<User | undefined> {
    const userData = localStorage.getItem(this.CURRENT_USER);
    console.log('User form storage userData: ' + userData);
    if (userData) {
      const localUser = JSON.parse(userData);
      console.log('localUser: ' + localUser.currentuser);
      return of(localUser);
    } else {
      return of(undefined);
    }
  }

  // get User Id
  getUserIdFromLocalStorage(): string {
    const userData = localStorage.getItem(this.CURRENT_USER);
    console.log('UserId form storage userData: ' + userData);
    const localUser = JSON.parse(userData!);
    return localUser.currentuser._id;
  }

  // User profile
  getUserProfile(id: String): Observable<any> {
    let api = `${environment.apiUrl}/api/user/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Check if user may edit
  userMayEdit(itemCreatedBy: string): Observable<boolean> {
    console.log('userMayEdit');
    return this.currentUser$.pipe(
      map((user: User | undefined) =>
        user ? user._id === itemCreatedBy : false
      )
    );
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http
      .get<User>(`${environment.apiUrl}/api/user/email/${email}`)
      .pipe(catchError(this.handleError));
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
