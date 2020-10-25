import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class MainCanActivateChildGuard implements CanActivateChild {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afAuth.authState.pipe(
      take(1),
      map( authState => {
        if (authState) {
          return true;
        } else{
          this.router.navigate(['login']);
          return false;
        }
      })
    );
  }

}
