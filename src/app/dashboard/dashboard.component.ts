import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EmployeeService } from '../services/employee.service';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dob','gender','education','company','experience','package','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _dialog : MatDialog, private _empService: EmployeeService, public router:Router) { }

  ngOnInit(): void {
    this.GetEmployeeList()
  }
  openAddEditEmpForm(){
    const _dialogref= this._dialog.open(EmpAddEditComponent);
    _dialogref.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.GetEmployeeList();
        }
      }
      
    })
    }

  GetEmployeeList(){
    this._empService.getEmployeelist().subscribe({
      next: (res) => {
        this.dataSource= new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error: console.log,

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  deleteEmployee(id: number){
    this._empService.deleteEmployee(id).subscribe({
      next: (res) =>{
        alert("Data Deleted Successfully")
        this.GetEmployeeList();
      }, 
      error: console.log,

    })
  }

  openeditform(data?:any){
    const _dialogref= this._dialog.open(EmpAddEditComponent, {
      data,
    })
    _dialogref.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.GetEmployeeList();
        }
      }
      
    })
  }

  logout(){
    this.router.navigate(['/EmpLogin']);
    sessionStorage.clear()

  }

  }



