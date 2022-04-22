import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MenubarModule } from 'primeng/menubar';
import { HeaderComponent } from './ui/components/layout/header/header.component';
import { HTTP_INTERCEPTORS_PROVIDERS } from './core/http';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    ButtonModule,
    SharedModule
  ],
  providers: [HTTP_INTERCEPTORS_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
