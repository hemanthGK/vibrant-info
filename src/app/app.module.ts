import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material/app-material.module';
import { HttpClientModule } from '@angular/common/http';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [UserFormComponent,UserDeleteComponent]
})
export class AppModule { }
