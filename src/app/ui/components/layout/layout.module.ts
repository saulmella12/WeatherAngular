import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenubarModule,
    SharedModule
  ]
})
export class LayoutModule { }
