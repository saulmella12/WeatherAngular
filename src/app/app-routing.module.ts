import { WeatherComponent } from './ui/components/weather/weather.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './ui/components/users/users-list/users-list.component';
import { UserDetailComponent } from './ui/components/users/user-detail/user-detail.component';
import { UserFormComponent } from './ui/components/users/user-form/user-form.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';


const rutas: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'users', loadChildren: () => import('./ui/components/users/users.module').then(m => m.UsersModule), canLoad:[AuthGuard]},
  { path: 'weather', loadChildren: () => import('./ui/components/weather/weather.module').then(m => m.WeatherModule), canLoad:[AuthGuard]},
  { path: 'login', loadChildren: () => import('./ui/components/login/login.module').then(m => m.LoginModule)}
  /*
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'user/create', component: UserFormComponent },
  { path: 'user/update/:id', component: UserFormComponent }
  */
];


@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
