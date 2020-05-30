import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { UserService, ResponseModel } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myUser: any;

  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private logService: LogService) { }

  ngOnInit(): void {
    this.userService.userData$
      .pipe(
        map((user: SocialUser | ResponseModel) => {
          if (user instanceof SocialUser || user.type === 'social') {
            return {
              email: 'test@test.com',
              ...user //display the whatever user has
            };

          } else {
            return user;
          }
        })
      )
      .subscribe((data: ResponseModel | SocialUser) => {
        this.myUser = data;

        //ADD LOG
        if (this.userService.userData$.getValue() != null && this.userService.userData$.getValue().type == 'social') {
          var newLog = { description: "", type: "" };
          
          if (this.userService.userData$.getValue().role == 555) {
            newLog.description = "Customer (Id: " + this.userService.userData$.getValue().id + ", E-mail: " + this.userService.userData$.getValue().email + ") logged in socially. "
          }
          else if (this.userService.userData$.getValue().role == 777) {
            newLog.description = "Admin (Id: " + this.userService.userData$.getValue().id + ", E-mail: " + this.userService.userData$.getValue().email + ") logged in socially."
          }
          newLog.type = "Login / Logout";

          this.logService.addNewLog(newLog).subscribe(returnVal => {});
        }

      });


    this.authService.authState.pipe(map((user: SocialUser | ResponseModel) => {
      if (user instanceof SocialUser) {
        return {
          email: 'test@test.com',
          ...user //display the whatever user has
        };

      } else {
        return user;
      }
    })
    ).subscribe((user: SocialUser) => {
      if (user != null) {
        this.myUser = user;
      }
      else {
        return;
      }
    })
  }

  logout() {
    this.userService.logout();
  }

}
