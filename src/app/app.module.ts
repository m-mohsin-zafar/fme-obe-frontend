import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NormalLayoutComponent } from './layouts/normal-layout/normal-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavComponent } from './layout-components/nav/nav.component';
import { FooterComponent } from './layout-components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NormalLayoutComponent,
    DashboardLayoutComponent,
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    NavComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
