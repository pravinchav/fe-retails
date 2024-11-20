import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, Column, IClientSideRowModel } from 'ag-grid-community';
import { environment } from '../../../environments/environment';

interface RefGroup {
  groupId: string;
  groupName: string;
  refDataList: { refCode: string; refName: string; refDate: string  }[];
}

@Component({
  selector: 'app-reference-data-form',
  templateUrl: './reference-data-form.component.html',
  styleUrls: ['./reference-data-form.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    CommonModule,
    MatDividerModule,
    AgGridModule
  ]
})
export class ReferenceDataFormComponent implements OnInit {
  
  refGroups: RefGroup[] = [
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1', refDate: '2023-01-01' },
        { refCode: 'code2', refName: 'Name 2', refDate: '2023-01-01' }
      ]
    },
    {
      groupId: 'group2',
      groupName: 'Group 2',
      refDataList: [
        { refCode: 'code3', refName: 'Name 3', refDate: '2023-01-01' },
        { refCode: 'code4', refName: 'Name 4', refDate: '2023-01-01' }
      ]
    }
  ];

  refNameOptions: string[] = ['Description 1', 'Description 2', 'Description 3', 'Description 4'];



  columnDefsGroup: ColDef[] = [
    
    { headerName: 'Id', field: 'groupId' },
    { headerName: 'Group Name', field: 'groupName', filter: 'agTextColumnFilter' },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params1: any) => {
        const button = document.createElement('span');
       // button.innerHTML = '<button  mat-icon-button="" color="warn" mat-ripple-loader-class-name="mat-mdc-button-ripple" class="mdc-icon-button mat-mdc-icon-button mat-warn mat-mdc-button-base" mat-ripple-loader-centered="" ng-reflect-color="warn"><span class="mat-mdc-button-persistent-ripple mdc-icon-button__ripple"></span><mat-icon  role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">delete</mat-icon><span class="mat-mdc-focus-indicator"></span><span class="mat-mdc-button-touch-target"></span><span class="mat-ripple mat-mdc-button-ripple"></span></button>';
       button.innerHTML =  environment.deleteButtonHtml;
       button.addEventListener('click', () => {
          this.deleteRowGroup(params1.node);
        });
        return button;
      }
    }
  ];

  columnDefs: ColDef[] = [
    
    { headerName: 'Code', field: 'refCode', editable: true, filter: 'agTextColumnFilter' },
    {
      headerName: 'Description',
      field: 'refName',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: this.refNameOptions
      },
    
      filter: 'agSetColumnFilter',
      filterParams: {
        values: this.refNameOptions
      }
    },
 { headerName: 'Date', field: 'refDate', editable: true, filter: 'agDateColumnFilter', cellEditor: 'agDateCellEditor' },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params: any) => {
        const button = document.createElement('span');
        button.innerHTML = environment.deleteButtonHtml;
        //button.classList.add('button', 'btn-danger');
        button.addEventListener('click', () => {
          this.deleteRow(params.node);
        });
        return button;
      }
    }
  ];

  rowData: { refCode: string; refName: string, refDate: string}[] = [];
  
  
  form: FormGroup;
  displayedColumns: string[] = ['refCode', 'refName'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      groupId: ['', Validators.required],
      groupName: ['', [Validators.required, Validators.maxLength(100)]],
      
      
      refDataList: this.rowData,
    });

   
  }

  ngOnInit() {
    // Initialize with the first group if needed
  }

  get refDataList(): FormArray {
    return this.form.get('refDataList') as FormArray;
  }

  addRefData() {
    this.refDataList.push(this.fb.group({
      refCode: ['', [Validators.required, Validators.maxLength(30)]],
      refName: ['', [Validators.required, Validators.maxLength(100)]]
    }));
  }

  removeRefData(index: number) {
    this.refDataList.removeAt(index);
  }

  selectGroup(group: RefGroup) {
    this.form.patchValue({
      groupId: group.groupId,
      groupName: group.groupName
    });
    //this.refDataList.clear();

    //const rowData: any[] = [];
    //this.gridApi.forEachNode((node: any) => rowData.push(node.data));
    //console.log(this.refData);
 //group.refDataList
    /*group.refDataList.forEach(refData => {
      this.refDataList.push(this.fb.group({
        refCode: [refData.refCode, [Validators.required, Validators.maxLength(30)]],
        refName: [refData.refName, [Validators.required, Validators.maxLength(100)]]
      }));
    });*/
    console.log(group);
    this.rowData = group.refDataList;
  }

  onSubmit() {
    const formData = this.form.value;
    const gridData = this.getGridData();
    console.log('Form Data:', formData);
    console.log('Grid Data:', this.rowData);
    // Handle form and grid data as needed
  }

  onCancel() {
    // Handle form cancellation
    this.form.reset();
  }

  private gridApi!: GridApi;
  private gridApi1!: GridApi;
  private gridColumnApi!: Column;

  onGridReady(params: any) {
    console.log("onGridReady:" + params.api)
    this.gridApi = params.api;

    this.gridColumnApi = params.columnApi;
  }

  onGridReadyGroup(params1: any) {
    console.log("onGridReady:" + params1.api)
   
    this.gridApi1 = params1.api;
    this.gridColumnApi = params1.columnApi;
  }


  addEmptyRow() {
    const newRow = { refCode: '', refName: ''};
    this.gridApi.applyTransaction({ add: [newRow] });
  }

  getGridData() {
    const rowData: any[] = [];
    this.gridApi.forEachNode((node: any) => rowData.push(node.data));
    console.log(rowData);
  }

  deleteRow(node: any) {
    this.gridApi.applyTransaction({ remove: [node.data] });
  }

  deleteRowGroup(node: any) {
    console.log("row delete " + node.data);
    this.gridApi1.applyTransaction({ remove: [node.data] });
  }

  onGroupClicked(event: any) {
    /*
    group = ${JSON.stringify(event.data)};
    this.form.patchValue({
      groupId: group.groupId,
      groupName: group.groupName
    });
    console.log(group);
    this.rowData = group.refDataList;*/
    const data = JSON.stringify(event.data);
    console.log(event.data.groupId)
    this.form.patchValue({
      groupId: event.data.groupId,
      groupName: event.data.groupName
    });
    this.rowData = event.data.refDataList;
    console.log(this.rowData)
    //alert(`Selected Row Data: ${JSON.stringify(event.data)}`);
  }


  onRowSelected(params: any) {
    const data = JSON.stringify(params.data);
    console.log(params.data.groupId)
    this.form.patchValue({
      groupId: params.data.groupId,
      groupName: params.data.groupName
    });
    this.rowData = params.data.refDataList;
    //alert(`Selected Row Data: ${JSON.stringify(params.data)}`);
  }

  onCellValueChanged(event: any) {
    //const rowIndex = event.rowIndex;
   // const formArray = this.refDataList;
    console.log( this.rowData);
    //const formGroup = formArray.at(rowIndex) as FormGroup;
    //formGroup.patchValue(event.data);
  }
  onCellFocused(event: any) {
    if (event.column ) {
      this.gridApi.startEditingCell({
        rowIndex: event.rowIndex,
        colKey: event.column.colId
      });
    }
  }
}