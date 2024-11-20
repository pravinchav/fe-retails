import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableGridComponent } from './editable-grid.component';

describe('EditableGridComponent', () => {
  let component: EditableGridComponent;
  let fixture: ComponentFixture<EditableGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
