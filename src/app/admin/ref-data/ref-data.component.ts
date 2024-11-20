import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
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
  refDataList: { refCode: string; refName: string;  }[];
}

@Component({
  selector: 'app-ref-data',
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
  ],
  templateUrl: './ref-data.component.html',
  styleUrl: './ref-data.component.css'
})
export class RefDataComponent {
  private gridApiGroups!: GridApi;
  private gridColumnApiGroups!: Column;
  isRowSelected: boolean = false;
  
  refGroups: RefGroup[] = [
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    {
      groupId: 'group1',
      groupName: 'Group 1',
      refDataList: [
        { refCode: 'code1', refName: 'Name 1' },
        { refCode: 'code2', refName: 'Name 2' }
      ]
    },
    
    {
      groupId: 'group2',
      groupName: 'Group 2',
      refDataList: [
        { refCode: 'code3', refName: 'Name 3' },
        { refCode: 'code4', refName: 'Name 4' }
      ]
    }
  ];

  columnDefsGroups: ColDef[] = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 40,
      suppressMenu: true,
      sortable: false,
      filter: false
    },
    { headerName: 'Group Name', field: 'groupName', filter: 'agTextColumnFilter' , flex: 1 },
    { headerName: 'Group ID', field: 'groupId', hide: true } // Hidden column

  ];


  deleteRowGroup(node: any) {
    console.log("row delete " + node.data);
    this.gridApiGroups.applyTransaction({ remove: [node.data] });
  }

  onGridReadyGroups(params: any) {
    this.gridApiGroups = params.api;
    this.gridColumnApiGroups = params.columnApi;
    this.gridApiGroups.addEventListener('selectionChanged', this.onSelectionChanged.bind(this));
  }

  deleteSelectedRows() {
    const selectedNodes = this.gridApiGroups.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    this.gridApiGroups.applyTransaction({ remove: selectedData });
  }

  onSelectionChanged() {
    const selectedNodes = this.gridApiGroups.getSelectedNodes();
    this.isRowSelected = selectedNodes.length > 0;
  }

  
}
