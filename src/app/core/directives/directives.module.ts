import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsAuthDirective } from './is-auth.directive';
import { RoleDirective } from './role.directive';
import { AdminRoleDirective } from './admin-role.directive';



@NgModule({
  declarations: [
    IsAuthDirective,
    RoleDirective,
    AdminRoleDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IsAuthDirective,
    RoleDirective,
    AdminRoleDirective
  ]
})
export class DirectivesModule { }
