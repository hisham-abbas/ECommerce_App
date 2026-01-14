import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ProductDetailsComponent } from './components/product-details/product-details';
import { RegisterComponent } from './components/register/register';
import { Login } from './components/login/login';
import { CartComponent } from './components/cart/cart';

import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

import { AdminDashboardComponent } from './admin/components/dashboard/dashboard';
import { AdminCategoriesComponent } from './admin/components/categories-list/categories-list';
import { AdminHome } from './admin/components/admin-home/admin-home';
import { AdminProductsComponent } from './admin/components/products/products';
import { AdminProductVariantsComponent } from './admin/components/admin-product-variants-component/admin-product-variants-component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders';
import { CheckoutComponent } from './components/checkout/checkout';
import { MyOrdersComponent } from './components/my-orders/my-orders';
import { OrderSuccessComponent } from './components/orders/order-success/order-success';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products/:id', component: ProductDetailsComponent },

  { path: 'login', component: Login },
  { path: 'register', component: RegisterComponent },

  { path: 'cart', component: CartComponent },

  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authGuard]
  },

  {
    path: 'orders',
    component: MyOrdersComponent,
    canActivate: [authGuard]
  },

  {
    path: 'orders/success/:id',
    component: OrderSuccessComponent,
    canActivate: [authGuard]
  },

  // ================= ADMIN =================
  {
    path: 'admin',
    component: AdminHome,
    canActivate: [authGuard, adminGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'products/:id/variants', component: AdminProductVariantsComponent },
      { path: 'orders', component: AdminOrdersComponent }
    ]
  }
];

