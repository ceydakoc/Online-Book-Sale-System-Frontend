import { Injectable } from '@angular/core';
import { AuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogService } from './log.service';
import { updateUserModel } from '../model/updateUser.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth = false;
  private SERVER_URL = environment.SERVER_URL;
  private user;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<any | SocialUser | ResponseModel | object>(null);
  loginMessage$ = new BehaviorSubject<string>(null);
  userRole: number;

  constructor(private authService: AuthService,
    private httpClient: HttpClient,
    private logService: LogService) {
    authService.authState.subscribe((user: SocialUser) => {
      if (user != null) {

        //this.auth = true;
        this.userRole = 555;
        //this.authState$.next(this.auth);
        //this.userData$.next(user);
        this.httpClient.get(`${this.SERVER_URL}users/validate/${user.email}`).subscribe((res: { status: boolean, user: object }) => {
          //  No user exists in database with Social Login
          if (!res.status) {
            // Send data to backend to register the user in database so that the user can place orders against his user id
            this.registerUser({
              email: user.email,
              fname: user.firstName,
              lname: user.lastName,
              password: '123456'
            }, user.photoUrl, 'social').subscribe(res => {
              if (res.message === 'Registration successful') {
                this.auth = true;
                this.authState$.next(this.auth);
                this.userData$.next(user);
              }
            });

          } else {
            this.auth = true;
            this.authState$.next(this.auth);
            this.userData$.next(res.user);
          }
        });


      }
    });


  }

  //  Login User with Email and Password
  loginUser(email: string, password: string) {

    this.httpClient.post<ResponseModel>(`${this.SERVER_URL}auth/login`, { email, password })
      .pipe(catchError((err: HttpErrorResponse) => of(err.error.message)))
      .subscribe((data: ResponseModel) => {
        if (typeof (data) === 'string') {
          this.loginMessage$.next(data);
        } else {
          this.auth = data.auth;
          this.userRole = data.role;
          this.authState$.next(this.auth);
          this.userData$.next(data);

          //ADD LOG
          var newLog = {description: "", type: ""};
          if (this.userRole == 555) {
            newLog.description = "Customer (Id: " + this.userData$.getValue().userId + ", E-mail: " + email + ") logged in locally. "
          }
          else if (this.userRole == 777) {
            newLog.description = "Admin (Id: " + this.userData$.getValue().userId + ", E-mail: " + email + ") logged in locally."
          }
          newLog.type = "Login / Logout";

          this.logService.addNewLog(newLog).subscribe(returnVal => {});
        }
      });

  }

  //  Google Authentication
  googleLogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

  }

  updateUser(user:updateUserModel) : Observable <any>{
    return this.httpClient.put<any>(`${this.SERVER_URL}users/updateUser`, {
      id : user.id,
      fname : user.fname,
      lname : user.lname,
      password : user.password
    });
    
  }

  logout() {

    //ADD LOG
    if (this.userData$.getValue() != null ) {
      var id; 
      var newLog = { description: "", type: "" };

      if(this.userData$.getValue().type == null) {
        newLog.description = "Customer (E-mail: " + this.userData$.getValue().email + ") logged out. "
      } 
      else {
        if(this.userData$.getValue().type == 'social'){
          id = this.userData$.getValue().id;
        }
        else {
          id = this.userData$.getValue().userId;
        }
      }

      if(this.userData$.getValue().role != null) {
        if (this.userData$.getValue().role == 555) {
          newLog.description = "Customer (Id: " + id + ", E-mail: " + this.userData$.getValue().email + ") logged out. "
        }
        else if (this.userData$.getValue().role == 777) {
          newLog.description = "Admin (Id: " + id + ", E-mail: " + this.userData$.getValue().email + ") logged out."
        }
      }

      
      newLog.type = "Login / Logout";

      this.logService.addNewLog(newLog).subscribe(returnVal => {});
    }

    this.authService.signOut();
    this.auth = false;
    this.authState$.next(this.auth);
    this.userData$.next(null);
  
  }

  registerUser(formData: any, photoUrl?: string, typeOfUser?: string): Observable<{ message: string }> {
    const { fname, lname, email, password } = formData;
    
     //ADD LOG
     var newLog = { description: "", type: "" };

     newLog.description = "Customer registered with E-mail: " + email

     newLog.type = "Register";

     this.logService.addNewLog(newLog).subscribe(returnVal => {});

    return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}auth/register`, {
      email,
      lname,
      fname,
      typeOfUser,
      password,
      photoUrl: photoUrl || null
    });
    
  }

  getAllUsers(): Observable<any> {
    return this.httpClient.get<any>(this.SERVER_URL + "users/")
  }

  getSingleUser(userId: Number): Observable<any> {
    return this.httpClient.get<any>(this.SERVER_URL + "users/" + userId)
  }

  deleteAdminUser(userId: Number): Observable<any> {
    return this.httpClient.delete<any>(this.SERVER_URL + "users/adminDelete/" + userId);
  }

  updateAdminUser(userId: Number, image: string, role: Number) {
    return this.httpClient.put(`${this.SERVER_URL}users/adminUpdate/` + userId, {
      role: role,
      id: userId,
      photoUrl: image
    });
  }
}

export interface ResponseModel {
  token: string;
  auth: boolean;
  email: string;
  username: string;
  fname: string;
  lname: string;
  photoUrl: string;
  userId: number;
  type: string;
  role: number;
}
