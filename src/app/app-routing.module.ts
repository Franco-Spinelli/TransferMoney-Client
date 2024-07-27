// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuard } from '../auth.guard';
import { TransfersComponent } from './transfers/transfers.component';
import { TransfersHistoryComponent } from './transfers-history/transfers-history.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AddMoneyComponent } from './add-money/add-money.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:'register', component: RegisterComponent},
  {path:'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard]},
  {path:'transfers', component: TransfersComponent, canActivate: [AuthGuard]},
  {path:'transfers-history', component: TransfersHistoryComponent, canActivate: [AuthGuard]},
  {path:'add-money', component: AddMoneyComponent, canActivate: [AuthGuard]},
  {path:'', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}