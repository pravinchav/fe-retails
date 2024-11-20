import { Component, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

interface RefGroup {
  groupId: string;
  groupName: string;
  refDataList: { refCode: string; refName: string }[];
}

@Component({
  selector: 'app-ref-group-list',
  templateUrl: './ref-group-list.component.html',
  styleUrls: ['./ref-group-list.component.css'],
  standalone: true,
  imports: [MatTableModule, MatRadioModule, MatSortModule, MatIconModule, CommonModule, ReactiveFormsModule]
})
export class RefGroupListComponent implements AfterViewInit {
  @Output() groupSelected = new EventEmitter<RefGroup>();
  @ViewChild(MatSort) sort!: MatSort;

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

  displayedColumns: string[] = ['select', 'groupId', 'groupName', 'actions'];
  searchControl = new FormControl('');
  dataSource = new MatTableDataSource(this.refGroups);

  constructor() {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((searchTerm) => {
      this.dataSource.filter = (searchTerm || '').trim().toLowerCase();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  selectGroup(group: RefGroup) {
    this.groupSelected.emit(group);
  }

  deleteGroup(group: RefGroup) {
    this.refGroups = this.refGroups.filter(g => g.groupId !== group.groupId);
    this.dataSource.data = this.refGroups;
  }
}