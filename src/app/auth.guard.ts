import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
//import { Observable } from 'rxjs';
import { EmployeeService } from './services/employee.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  gettoken: any;
  constructor(
    private service: EmployeeService, public router:Router
  ){}

  canActivate(): boolean {
    if(this.service.gettoken()){
      return true
    }else{
      this.router.navigate(['/EmpLogin']);
      return false
    }
    
  }

}
