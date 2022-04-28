
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {InputSwitchModule} from 'primeng/inputswitch';
import {CalendarModule} from 'primeng/calendar';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import { PaginatorModule } from 'primeng/paginator';
import { NgModule } from '@angular/core';
const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path: ':id', component: UserDetailComponent },
  { path: 'form/create', component: UserFormComponent, canActivate: [RoleGuard],data: {role: 'ROLE_ADMIN'} },
  { path: 'form/update/:id', component: UserFormComponent, canActivate: [RoleGuard], data: {role: ['ROLE_EDITOR','ROLE_ADMIN']} }
];

@NgModule({
  declarations: [
    UsersListComponent,
    UserDetailComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CalendarModule,
    TableModule,
    InputSwitchModule,
    ReactiveFormsModule,
    PaginatorModule,
    RouterModule.forChild(routes),
    DirectivesModule
  ],
  exports: [
    UsersListComponent,
    UserDetailComponent,
    UserFormComponent
  ],
})
export class UsersModule { }
