import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
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
      if (this.login.role == 777) {
        console.log("admin")
        this.router.navigateByUrl("/products");
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
