// app.routes.ts
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthGuard } from './_guards/auth.guard';

export const routes = [
	{ path: 'login', component: LoginComponent },
  	{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
  	{ path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },

	{ path: '**', redirectTo: '' }
];
