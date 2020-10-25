import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainCanActivateChildGuard } from './main/main-can-activate-child.guard';

const routes: Routes = [
  { path: '',
    children: [
      { path: '',
        canActivateChild: [MainCanActivateChildGuard],
        loadChildren: './main/main.module#MainModule'}]
  },
  { path: 'login',
    component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
