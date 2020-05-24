import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  login: any;
  constructor(private userService: UserService,
    private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.login = this.userService.userData$.getValue();
    console.log(this.login);

    if (this.login != null) {
      //@ts-ignore
      if (this.login.role == 555) {
        console.log("customer")
        this.router.navigateByUrl("/");
        return false;
      }
      else {
        return true;
      }

    }
    else {
      console.log("no login")
      this.router.navigateByUrl("/login");
      return false;
    }
  }

}
