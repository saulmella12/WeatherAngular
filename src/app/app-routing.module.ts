import { WeatherComponent } from './ui/components/weather/weather.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './ui/components/users-list/users-list.component';
import { UserDetailComponent } from './ui/components/user-detail/user-detail.component';


const rutas: Routes = [
  { path: '', redirectTo: '/weather', pathMatch: 'full' },
  { path: 'weather', component: WeatherComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: UserDetailComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
