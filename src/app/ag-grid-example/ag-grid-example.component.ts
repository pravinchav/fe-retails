import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, Column } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-example',
  templateUrl: './ag-grid-example.component.html',
  styleUrls: ['./ag-grid-example.component.css'],
  standalone: true,
  imports: [CommonModule, AgGridModule]
})
export class AgGridExampleComponent {
  columnDefs: ColDef[] = [
    {
      headerName: '',
      field: 'radio',
      cellRenderer: (params: any) => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'rowRadio';
        radio.addEventListener('click', () => {
          this.onRowSelected(params);
        });
        return radio;
      },
      width: 50
    },
    { headerName: 'Make', field: 'make', editable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Model', field: 'model', editable: true, filter: 'agTextColumnFilter' },
    { headerName: 'Price', field: 'price', editable: true, filter: 'agNumberColumnFilter' },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        button.innerText = 'Delete';
        button.classList.add('btn', 'btn-danger');
        button.addEventListener('click', () => {
          this.deleteRow(params.node);
        });
        return button;
      }
    }
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'BMW', model: '5 Series', price: 59000 },
    { make: 'Audi', model: 'A4', price: 45000 }
  ];

  private gridApi!: GridApi;
  private gridColumnApi!: Column;

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  addEmptyRow() {
    const newRow = { make: '', model: '', price: null };
    this.gridApi.applyTransaction({ add: [newRow] });
  }

  deleteRow(node: any) {
    this.gridApi.applyTransaction({ remove: [node.data] });
  }

  onQuickFilterChanged(event: any) {
    //this.gridApi.setQuickFilter(event.target.value);
  }

  getGridData() {
    const rowData: any[] = [];
    this.gridApi.forEachNode((node: any) => rowData.push(node.data));
    console.log(rowData);
  }

 
  onRowSelected(params: any) {
    alert(`Selected Row Data: ${JSON.stringify(params.data)}`);
  }
}