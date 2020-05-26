import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  willDeleteId: Number;
  willEditId: Number;
  p: number = 1;
  searchText: string;
  keysToInclude: any[] = ["id", "username", "email", "fname", "lname", "role", "type"];
  selectedOption: string = "all"
  userId: Number = null;
  userImage: string = ""
  username: string = "";
  userEmail: string = "";
  userFname: string = "";
  userLname: string = "";
  userRole: Number = null;
  userType: string = "";
  roles: any[] = [{
    role: 555,
    name: "555 - Customer"
  },
  {
    role: 777,
    name: "777 - Admin"
  }];
  users: any[] = [];
  constructor(private userService: UserService,
    private toast: ToastrService) {

  }

  ngOnInit(): void {
    this.getUsers();
  }
  getDeleteUserId(userId: Number) {
    this.willDeleteId = userId;
  }
  getEditUserId(userId: Number) {
    this.willEditId = userId;

    this.userService.getSingleUser(this.willEditId).subscribe(returnVal => {
      if (returnVal.success) {

        this.userId = returnVal.user.id;
        this.userImage = returnVal.user.photoUrl;
        this.username = returnVal.user.username;
        this.userFname = returnVal.user.fname;
        this.userLname = returnVal.user.lname;
        this.userEmail = returnVal.user.email;
        this.userRole = returnVal.user.role;
        this.userType = returnVal.user.type;
      }
      console.log(this.userEmail)
    })
  }
  addUser() {

  }
  editUser() {
    console.log(this.userRole)
    if (this.userImage != "" && this.userRole != null) {
      this.userService.updateAdminUser(this.userId, this.userImage, this.userRole).subscribe(returnVal => {
        //@ts-ignore
        if (returnVal.success) {
          this.toast.success(`User successfully updated.`, "", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          this.getUsers();
        }
        else {
          this.toast.error(`Could not updated.`, "", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      })
    }
    else {
      this.toast.error(`Please fill the required fields.`, "", {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }

  }
  getUsers() {
    this.users.length = 0;
    this.userService.getAllUsers().subscribe(returnVal => {
      this.users = returnVal.users;
      console.log(this.users);
    })
  }
  deleteUser() {
    this.userService.deleteAdminUser(this.willDeleteId).subscribe(returnVal => {
      if (returnVal.success) {
        this.toast.success(`Successfully deleted from users.`, "", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
        this.getUsers();
      }
      else {
        this.toast.error(`Something went wrong :( Could not deleted from users`, "", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    })
  }
  filterBy() {
    this.keysToInclude.length = 0;
    if (this.selectedOption !== "all") {
      this.keysToInclude.push(this.selectedOption)
    }
    else {
      this.keysToInclude.push("id", "username", "email", "fname", "lname", "role", "type");
    }
  }

}
