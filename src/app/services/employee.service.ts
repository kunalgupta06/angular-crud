import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }

  addEmployee(data:any):Observable<any>{
    return this._http.post('http://localhost:3000/Employee', data)
  }

  updateEmployee(id: number,data:any):Observable<any>{
    return this._http.put(`http://localhost:3000/Employee/${id}`, data)
  }


  getEmployeelist():Observable<any>{
    return this._http.get('http://localhost:3000/Employee')
  }

  deleteEmployee(id: number):Observable<any>{
    return this._http.delete(`http://localhost:3000/Employee/${id}`);
  }

  gettoken(){
    return sessionStorage.getItem('token')
  }


  storetoken(value:string){
    sessionStorage.setItem('token', value)
  }

}
