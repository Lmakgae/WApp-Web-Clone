import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainCanLoadGuard implements CanLoad {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.afAuth.authState.pipe(
        take(1),
        map( authState => {
          if (authState) {
            return true;
          } else {
            this.router.navigate(['login']);
            return false;
          }
        })
      );
  }
}
