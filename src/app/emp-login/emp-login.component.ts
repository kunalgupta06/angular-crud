import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.css']
})
export class EmpLoginComponent implements OnInit {
  username: string='';
  password: string='';

  fixedusername: string='kunal';
  fixedpassword: string='123';

  constructor(private router: Router, private services:EmployeeService) { }

  ngOnInit(): void {
    sessionStorage.clear()
  }
  onsummit(){
    if(this.fixedusername==this.username && this.fixedpassword==this.password){
      this.services.storetoken(this.username);
      this.router.navigate(['/Dashboard']);
    } 
    else{
      alert('Incorrect username or Password');
    }

  }

}
