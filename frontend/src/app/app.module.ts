import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActionBoxComponent } from './components/action-box/action-box.component';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { InputWithFieldsetComponent } from './components/input-with-fieldset/input-with-fieldset.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SideMenuComponent,
    ActionBoxComponent,
    LoginComponent,
    CoursesComponent,
    InputWithFieldsetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
