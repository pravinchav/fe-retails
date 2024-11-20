import { Routes } from '@angular/router';
import { ReferenceDataFormComponent } from './admin/reference-data-form/reference-data-form.component';
import { RefDataComponent } from './admin/ref-data/ref-data.component';
import { EditableGridComponent } from './editable-grid/editable-grid.component';
//import { ListComponent } from './list/list.component';
import {AgGridExampleComponent} from './ag-grid-example/ag-grid-example.component';
export const routes: Routes = [
    { path: 'admin/reference-data/form', component: ReferenceDataFormComponent },
    { path: 'admin/ref-data/form', component: RefDataComponent },
    { path: 'editable-grid', component: EditableGridComponent },
    { path: 'ag-grid-example', component: AgGridExampleComponent },
    
];
