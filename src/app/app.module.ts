import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { fakeBackendProvider } from './_helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService, ProductsService } from './_services/index';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
	ProductsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	RouterModule.forRoot(routes)
  ],
  providers: [
	  AuthGuard,
	  AuthenticationService,
	  UserService,
	  ProductsService,

	  fakeBackendProvider,
	  MockBackend,
	  BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
