import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmpLoginComponent } from './emp-login/emp-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path: "", redirectTo: "/EmpLogin", pathMatch: "full"
  },
  {
    path: "emp-add-edit", component: EmpAddEditComponent
  },
  { path: 'EmpLogin', component: EmpLoginComponent },
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
