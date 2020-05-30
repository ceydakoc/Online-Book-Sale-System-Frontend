import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { UserService, ResponseModel } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LogService } from 'src/app/services/log.service';
import { ToastrService } from 'ngx-toastr';
import { updateUserModel } from '../../model/updateUser.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myUser: any;
  fname: string = "";
  lname: string = "";
  oldPassword: string = "";
  newPassword: string = ""
  newPasswordCheck: string = ""

  user: updateUserModel = {
    id: "",
    fname: this.fname,
    lname: this.lname,
    password: this.newPassword,
  }

  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private logService: LogService,
    private toast: ToastrService) { }

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
        console.log(this.myUser)

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

          this.logService.addNewLog(newLog).subscribe(returnVal => { });
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

  updateProfile() {
    if (this.fname == "" && this.lname == "") {
      this.toast.error(`Name and surname can not be empty :( Could not deleted from categories`, "", {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
    if (this.newPassword.length < 6 && this.newPasswordCheck.length < 6) {
      this.toast.error(`Password can not be less than 6 characters :( Could not deleted from categories`, "", {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
    if (this.newPassword !== this.newPasswordCheck) {
      this.toast.error(`Passwords is not matching`, "", {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
    if (this.fname != "" && this.lname != "" && this.newPassword.length > 5 && this.newPasswordCheck.length > 5 && this.newPassword === this.newPasswordCheck) {

      this.user = {
        id: this.myUser.id || this.myUser.userId,
        fname: this.fname,
        lname: this.lname,
        password: this.newPassword,
      }
      this.userService.updateUser(this.user).subscribe(returnVal => {
        if (returnVal.success) {
          this.toast.success(`Profiled updated successfully please login again`, "", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          this.logout()
        }
        else {
          this.toast.error(`Something went wrong :( Could not updated profile`, "", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      })
    }
  }

  deleteAccount(userId: number) {
    if (window.confirm('Are you sure you want to delete the account?')) {
      this.userService.deleteAdminUser(userId).subscribe(returnVal => {
        if (returnVal.success) {
          this.toast.success(`Your account deleted successfully`, "", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
        else {
          this.toast.error(`Something went wrong :( Account could not deleted`, "", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      })
    }
    alert(userId)
    this.logout()
  }

  logout() {
    this.userService.logout();
  }

}
