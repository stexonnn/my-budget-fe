import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { AuthGuard } from './shared/authGuard';
import { TransactionComponent } from './components/transaction/transaction.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionComponent, canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
