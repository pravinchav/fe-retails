import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-editable-grid',
  templateUrl: './editable-grid.component.html',
  styleUrls: ['./editable-grid.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    CommonModule
  ]
})
export class EditableGridComponent implements OnInit {
  form: FormGroup;
  displayedColumns: string[] = ['attr1', 'attr2', 'attr3', 'attr4', 'actions'];
  private dataSourceSubject: BehaviorSubject<FormArray>;
  dataSource$: Observable<FormArray>;

  constructor(private fb: FormBuilder) {
    this.dataSourceSubject = new BehaviorSubject<FormArray>(this.fb.array([]));
    this.dataSource$ = this.dataSourceSubject.asObservable();
    this.form = this.fb.group({
      gridData: this.fb.array([])
    });
  }

  ngOnInit() {
    // Initialize with an empty row if needed
    this.addRow();
    this.addRow();
    
  }

  get gridData(): FormArray {
    return this.form.get('gridData') as FormArray;
  }

  addRow() {
    alert("Adding");
    this.gridData.push(this.fb.group({
      attr1: ['', Validators.required],
      attr2: ['', Validators.required],
      attr3: ['', Validators.required],
      attr4: ['', Validators.required]
    }));
    this.dataSourceSubject.next(this.gridData);
    console.log(this.form.value);
  }

  removeRow(index: number) {
    this.gridData.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      // Handle form submission
      console.log(this.form.value);
    }
  }
}