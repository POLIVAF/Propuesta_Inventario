import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { InventoryList } from './features/inventory/inventory-list/inventory-list';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'inventory', component: InventoryList, canActivate: [authGuard] },
  { path: '', redirectTo: '/inventory', pathMatch: 'full' }
];
