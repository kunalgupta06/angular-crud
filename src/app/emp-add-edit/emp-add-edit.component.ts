import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
  
    @Inject(MAT_DIALOG_DATA) public data: any
  public empForm!: FormGroup;

  currentdate: Date = new Date();

  education: string[] = [
    'Matric',
    'Intermediate',
    'Diploma',
    'Graduate',
    'Post-Graduate',
    'PHD',
  ]

  constructor(private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogref: MatDialogRef<EmpAddEditComponent>
  ) { }

  ngOnInit(): void {
    alert('date' + this.currentdate)
    this.empForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      experience: ['', Validators.required],
      package: ['', Validators.required],
    })
    this.empForm.patchValue(this.data);

  }
  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        // Update employee
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee details Updated!!');
            this._dialogref.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        // Add employee
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee added Successfully');
            this._dialogref.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    } else {
      alert("Kindly fill all the details");
    }
  }
  

   




  closeDialog() {
    this._dialogref.close(true);
  }


}
