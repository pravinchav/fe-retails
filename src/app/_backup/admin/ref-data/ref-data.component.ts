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
  @ViewChild('resizableDiv') resizableDiv!: ElementRef;
  private gridApiGroups!: GridApi;
  private gridColumnApiGroups!: Column;
  isRowSelected: boolean = false;
  constructor(private renderer: Renderer2) {}

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
      width: 50,
      suppressMenu: true,
      sortable: false,
      filter: false
    },
    { headerName: 'Group Name', field: 'groupName', filter: 'agTextColumnFilter' }
    /*{
      headerName: '',
      field: 'actions',
      filter:'',
      width:45,
      sortable:false,
      cellClass: 'delete-cell',
      cellRenderer: (params: any) => {
        const button = document.createElement('span');
       // button.innerHTML = '<button  mat-icon-button="" color="warn" mat-ripple-loader-class-name="mat-mdc-button-ripple" class="mdc-icon-button mat-mdc-icon-button mat-warn mat-mdc-button-base" mat-ripple-loader-centered="" ng-reflect-color="warn"><span class="mat-mdc-button-persistent-ripple mdc-icon-button__ripple"></span><mat-icon  role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">delete</mat-icon><span class="mat-mdc-focus-indicator"></span><span class="mat-mdc-button-touch-target"></span><span class="mat-ripple mat-mdc-button-ripple"></span></button>';
       button.innerHTML =  environment.deleteButtonHtml;
       button.classList.add('button', 'btn-danger');
       button.addEventListener('click', () => {
          this.deleteRowGroup(params.node);
        });
        return button;
      }
    }*/
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

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = this.resizableDiv.nativeElement.offsetWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      this.renderer.setStyle(this.resizableDiv.nativeElement, 'width', `${newWidth}px`);
    };

    const onMouseUp = () => {
      this.renderer.removeClass(document.body, 'resizing');
      this.renderer.listen('document', 'mousemove', onMouseMove);
      this.renderer.listen('document', 'mouseup', onMouseUp);
    };

    this.renderer.addClass(document.body, 'resizing');
    this.renderer.listen('document', 'mousemove', onMouseMove);
    this.renderer.listen('document', 'mouseup', onMouseUp);
  }
}
