import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    title: 'Fresh-Cart | Main Page'
  },
  {
    path: 'shop',
    loadComponent: () => import('./shop/shop.component').then(m => m.ShopComponent),
    title: 'Fresh-Cart | Shop'
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent),
    title: 'Fresh-Cart | Shopping Cart'
  },
  {
    path: 'brands',
    loadComponent: () => import('./brands/brands.component').then(m => m.BrandsComponent),
    title: 'Fresh-Cart | Brands'
  },
  {
    path: 'categories',
    loadComponent: () => import('./categories/categories.component').then(m => m.CategoriesComponent),
    title: 'Fresh-Cart | Categories'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    title: 'Fresh-Cart | Login'
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    title: 'Fresh-Cart | Register'
  },
  {
    path: 'p-details/:id',
    loadComponent: () => import('./p-details/p-details.component').then(m => m.PDetailsComponent),
    title: 'Fresh-Cart | '
  },
  {
    path: 'c-details/:id',
    loadComponent: () => import('./c-details/c-details.component').then(m => m.CDetailsComponent),
    title: 'Fresh-Cart | '
  },
  {
    path: 'payment/:id',
    loadComponent: () => import('./features/payment/payment.component').then(m => m.PaymentComponent),
    title: 'Fresh-Cart | Paymant '
  },
  {
    path: '**',
    loadComponent: () => import('./shared/componets/wild-card/wild-card.component').then(m => m.WildCardComponent),
    title: 'Fresh-Cart | Error'
  },
];
