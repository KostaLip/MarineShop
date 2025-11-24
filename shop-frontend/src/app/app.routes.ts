import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth-guard-guard';
import { LoginComponent } from './components/main/login/login';
import { SignupComponent } from './components/main/signup/signup';
import { ShopHome } from './components/main/shop-home/shop-home'; 
import { CategoryList } from './components/main/category-list/category-list';
import { CartComponent } from './components/main/cart/cart';
import { Profile } from './components/main/profile/profile';
import { AdminCategory } from './components/admin/admin-category/admin-category';
import { AdminGuard } from './guard/admin-guard-guard';
import { AdminUser } from './components/admin/admin-user/admin-user';
import { AdminProduct } from './components/admin/admin-product/admin-product';
import { Checkout } from './components/main/checkout/checkout';
import { Cancel } from './components/main/cancel/cancel';
import { Success } from './components/main/success/success';
import { Orders } from './components/main/orders/orders';
import { AdminOrder } from './components/admin/admin-order/admin-order';

export const routes: Routes = [
  {
    path: '',
    component: ShopHome,
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: Profile,
    canActivate: [AuthGuard]
  },
  {
    path: 'cancel',
    component: Cancel,
    canActivate: [AuthGuard]
  },
  {
    path: 'success',
    component: Success,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    component: Orders,
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout',
    component: Checkout,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/orders',
    component: AdminOrder,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/categories',
    component: AdminCategory,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/users',
    component: AdminUser,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/products',
    component: AdminProduct,
    canActivate: [AdminGuard]
  },
  {
    path: 'categories',
    component: CategoryList,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
